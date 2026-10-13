"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, CircleAlertIcon, CircleCheckIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";

import { sendContact } from "@/app/actions/contact";
import { WhatsappLink } from "@/components/shared/whatsapp-link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactPage, finalCta, links, serviceOptions, ui } from "@/content/data";
import { track } from "@/lib/analytics";
import { CONTACT_LIMITS } from "@/lib/constants";
import { contactSchema, type ContactFormValues, type ContactInput } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

type Status = { tone: "ok" | "error"; text: string; withEmail?: boolean } | null;

/** Campo com rótulo flutuante (o rótulo sobe quando o campo tem foco ou valor). */
const fieldClass =
  "field-input h-15 rounded-2xl border-line-strong bg-background px-4 pt-6 pb-2 text-base shadow-none md:text-base dark:bg-background " +
  "focus-visible:border-data focus-visible:ring-[3px] focus-visible:ring-data/20";
const labelClass = "field-label";

/** Campos obrigatórios, para a barra de progresso. */
const REQUIRED = ["name", "email", "service", "message", "consent"] as const;

/** Cabeçalho de uma etapa do formulário (as etapas são uma sequência real). */
function Step({ index, title }: { index: number; title: string }) {
  return (
    <legend className="mb-5 flex items-center gap-3 eyebrow text-muted-foreground">
      <span className="text-foreground">{String(index).padStart(2, "0")}</span>
      {title}
    </legend>
  );
}

function Optional() {
  return <span className="font-normal text-muted-foreground"> ({contactPage.form.optional})</span>;
}

export function ContactForm() {
  const f = contactPage.form;
  const [status, setStatus] = useState<Status>(null);
  const [pending, startTransition] = useTransition();
  const started = useRef(false);
  // Evita envio duplicado (duplo clique ou Enter repetido) antes do botão desabilitar.
  const submitting = useRef(false);

  const form = useForm<ContactFormValues, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      contact: "",
      service: "",
      message: "",
      consent: false,
      website: "",
      startedAt: 0,
    },
    // Valida no envio e, depois disso, em linha a cada digitação. Validar ao
    // sair do campo faria a mensagem de erro empurrar o botão para baixo no
    // meio do toque em "Enviar" (o clique se perde, principalmente no celular).
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // Marca a hora de abertura no navegador (proteção contra envio automático).
  useEffect(() => {
    form.setValue("startedAt", Date.now());
  }, [form]);

  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("contact_form_start");
  }

  function onSubmit(values: ContactInput) {
    if (submitting.current) return;
    submitting.current = true;
    setStatus(null);
    startTransition(async () => {
      const result = await sendContact(values).finally(() => {
        submitting.current = false;
      });
      switch (result.status) {
        case "ok":
          track("contact_form_submit", { service: values.service });
          form.reset();
          form.setValue("startedAt", Date.now());
          setStatus({ tone: "ok", text: f.success });
          break;
        case "invalid":
          for (const [name, message] of Object.entries(result.fieldErrors)) {
            form.setError(name as keyof ContactFormValues, { message }, { shouldFocus: true });
          }
          break;
        case "too-fast":
          setStatus({ tone: "error", text: f.tooFast });
          break;
        case "not-configured":
          setStatus({ tone: "error", text: f.notConfigured, withEmail: true });
          break;
        default:
          setStatus({ tone: "error", text: f.error, withEmail: true });
      }
    });
  }

  const values = useWatch({ control: form.control });
  const done = REQUIRED.filter((key) => {
    const value = values[key];
    if (key === "email") return /^\S+@\S+\.\S+$/.test(String(value));
    if (key === "message") return String(value).trim().length >= 10;
    return Boolean(value);
  }).length;

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        onFocusCapture={onFirstInteraction}
        noValidate
        className="grid gap-10"
        aria-describedby="contact-status"
      >
        {/* Progresso dos campos obrigatórios e o atalho para o WhatsApp. */}
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs tracking-wide text-muted-foreground">
              {f.progress(done, REQUIRED.length)}
            </p>
            {links.whatsapp && (
              <p className="text-sm text-muted-foreground">
                {ui.orWhatsapp}{" "}
                <WhatsappLink
                  message={finalCta.whatsappMessage}
                  source="contato-form"
                  className="inline-flex items-center gap-1 font-medium text-link underline-offset-4 hover:underline"
                >
                  <MessageCircleIcon aria-hidden="true" className="size-4" />
                  {ui.whatsapp}
                </WhatsappLink>
              </p>
            )}
          </div>
          <div aria-hidden="true" className="h-px overflow-hidden rounded-full bg-line">
            <div
              className="h-full origin-left bg-gradient-to-r from-grad-from to-grad-to transition-transform duration-700 ease-brand"
              style={{ transform: `scaleX(${done / REQUIRED.length})` }}
            />
          </div>
        </div>

        <fieldset className="grid gap-4">
          <Step index={1} title={f.steps[0]} />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="gap-1.5">
                  <div className="field">
                    <FormControl>
                      <Input
                        autoComplete="name"
                        maxLength={CONTACT_LIMITS.nameMax}
                        placeholder=" "
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className={labelClass}>{f.name}</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="gap-1.5">
                  <div className="field">
                    <FormControl>
                      <Input
                        autoComplete="organization"
                        maxLength={CONTACT_LIMITS.companyMax}
                        placeholder=" "
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className={labelClass}>
                      {f.company}
                      <Optional />
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-1.5">
                  <div className="field">
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        maxLength={CONTACT_LIMITS.emailMax}
                        placeholder=" "
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className={labelClass}>{f.email}</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="gap-1.5">
                  <div className="field">
                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={CONTACT_LIMITS.contactMax}
                        placeholder=" "
                        className={fieldClass}
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className={labelClass}>
                      {f.contact}
                      <Optional />
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        <fieldset className="grid gap-4">
          <Step index={2} title={f.steps[1]} />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <div className="field field-select">
                  <FormControl>
                    <select
                      {...field}
                      className={cn(
                        fieldClass,
                        "w-full appearance-none border pr-11 outline-none aria-invalid:border-destructive",
                        field.value === "" && "text-muted-foreground",
                      )}
                    >
                      <option value="" disabled>
                        {f.servicePlaceholder}
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option} className="text-foreground">
                          {option}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormLabel className={labelClass}>{f.service}</FormLabel>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <div className="field field-area">
                  <FormControl>
                    <Textarea
                      placeholder={f.messagePlaceholder}
                      maxLength={CONTACT_LIMITS.messageMax}
                      className={cn(
                        fieldClass,
                        "[field-sizing:fixed] h-auto min-h-[160px] resize-y pt-8 leading-normal",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormLabel className={labelClass}>{f.message}</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="grid gap-6">
          <Step index={3} title={f.steps[2]} />
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="mt-1 size-4 shrink-0 accent-[var(--cta)]"
                    />
                  </FormControl>
                  <FormLabel className="block text-sm leading-relaxed font-normal text-muted-foreground">
                    {f.consent}{" "}
                    <Link href="/privacidade" className="text-link underline underline-offset-2">
                      {f.privacyLink}
                    </Link>
                    .
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot anti-spam: fora da tela e fora da ordem de tabulação. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label htmlFor="contact-website">Não preencha este campo</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("website")}
            />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="btn-pulse h-14 justify-self-start px-8 text-base disabled:cursor-progress disabled:opacity-65"
          >
            {pending ? f.sending : f.submit}
          </Button>

          <div id="contact-status" role="status" aria-live="polite">
            {status && (
              <p
                className={cn(
                  "flex items-start gap-2.5 rounded-2xl border p-4 text-sm leading-relaxed",
                  status.tone === "ok"
                    ? "border-data/40 bg-data/5 text-foreground"
                    : "border-destructive/40 bg-destructive/5 text-foreground",
                )}
              >
                {status.tone === "ok" ? (
                  <CircleCheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-data"
                  />
                ) : (
                  <CircleAlertIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-destructive"
                  />
                )}
                <span>
                  {status.text}
                  {status.withEmail && (
                    <>
                      {" "}
                      <a href={`mailto:${links.email}`} className="font-medium underline">
                        {links.email}
                      </a>
                      .
                    </>
                  )}
                </span>
              </p>
            )}
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
