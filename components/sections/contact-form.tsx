"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { sendContact } from "@/app/actions/contact";
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
import { contactPage, links, serviceOptions } from "@/content/data";
import { track } from "@/lib/analytics";
import { CONTACT_LIMITS } from "@/lib/constants";
import { contactSchema, type ContactFormValues, type ContactInput } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

type Status = { tone: "ok" | "error"; text: string; withEmail?: boolean } | null;

const fieldClass =
  "h-11 rounded-md border-line-strong bg-background px-3 text-base shadow-none md:text-base dark:bg-background " +
  "placeholder:text-muted-foreground focus-visible:border-link focus-visible:ring-[3px] focus-visible:ring-link/25";

function Optional() {
  return <span className="font-normal text-muted-foreground"> ({contactPage.form.optional})</span>;
}

export function ContactForm() {
  const f = contactPage.form;
  const [status, setStatus] = useState<Status>(null);
  const [pending, startTransition] = useTransition();
  const started = useRef(false);

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
    // Valida no envio e, depois disso, a cada digitação. Validar no blur faria a
    // mensagem de erro empurrar o botão para baixo no meio do clique em "Enviar".
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
    setStatus(null);
    startTransition(async () => {
      const result = await sendContact(values);
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
        case "not-configured":
          setStatus({ tone: "error", text: f.notConfigured, withEmail: true });
          break;
        default:
          setStatus({ tone: "error", text: f.error, withEmail: true });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onFocusCapture={onFirstInteraction}
        noValidate
        className="grid gap-5"
        aria-describedby="contact-status"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="text-sm font-medium">{f.name}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    maxLength={CONTACT_LIMITS.nameMax}
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="text-sm font-medium">
                  {f.company}
                  <Optional />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="organization"
                    maxLength={CONTACT_LIMITS.companyMax}
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="text-sm font-medium">{f.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={CONTACT_LIMITS.emailMax}
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="text-sm font-medium">
                  {f.contact}
                  <Optional />
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={CONTACT_LIMITS.contactMax}
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <FormLabel className="text-sm font-medium">{f.service}</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className={cn(
                    fieldClass,
                    "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] w-full appearance-none rounded-md border bg-[length:1.1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 outline-none aria-invalid:border-destructive",
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <FormLabel className="text-sm font-medium">{f.message}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={f.messagePlaceholder}
                  maxLength={CONTACT_LIMITS.messageMax}
                  className={cn(
                    fieldClass,
                    "[field-sizing:fixed] h-auto min-h-[140px] resize-y py-2.5 leading-normal",
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          size="lg"
          disabled={pending}
          className="btn-glow h-12 justify-self-start px-6 text-base disabled:cursor-progress disabled:opacity-65"
        >
          {pending ? f.sending : f.submit}
        </Button>

        <div id="contact-status" role="status" aria-live="polite">
          {status && (
            <p
              className={cn(
                "flex items-start gap-2.5 rounded-md border p-4 text-sm leading-relaxed",
                status.tone === "ok"
                  ? "border-link/30 bg-link/5 text-foreground"
                  : "border-destructive/40 bg-destructive/5 text-foreground",
              )}
            >
              {status.tone === "ok" ? (
                <CircleCheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
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
      </form>
    </Form>
  );
}
