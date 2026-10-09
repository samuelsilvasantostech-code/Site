"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
import { contact, links } from "@/content/data";
import { CONTACT_LIMITS } from "@/lib/constants";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

type Status = { tone: "ok" | "error"; text: string; withEmail?: boolean } | null;

const fieldClass =
  "h-auto rounded-md border-line-strong bg-card px-[0.95rem] py-[0.85rem] text-base shadow-none md:text-base dark:bg-card " +
  "placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand-soft";

export function ContactForm() {
  const f = contact.form;
  const [status, setStatus] = useState<Status>(null);
  const [pending, startTransition] = useTransition();

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
    // Valida no envio e, depois disso, a cada digitação. Validar no blur faria a
    // mensagem de erro empurrar o botão para baixo no meio do clique em "Enviar".
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  function onSubmit(values: ContactInput) {
    setStatus(null);
    startTransition(async () => {
      const result = await sendContact(values);
      switch (result.status) {
        case "ok":
          form.reset();
          setStatus({ tone: "ok", text: f.success });
          break;
        case "invalid":
          for (const [name, message] of Object.entries(result.fieldErrors)) {
            form.setError(name as keyof ContactInput, { message }, { shouldFocus: true });
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
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-[1.1rem]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="gap-[0.4rem]">
              <FormLabel className="text-sm font-semibold">{f.name}</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem className="gap-[0.4rem]">
              <FormLabel className="text-sm font-semibold">{f.email}</FormLabel>
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
          name="message"
          render={({ field }) => (
            <FormItem className="gap-[0.4rem]">
              <FormLabel className="text-sm font-semibold">{f.message}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={f.messagePlaceholder}
                  maxLength={CONTACT_LIMITS.messageMax}
                  className={cn(
                    fieldClass,
                    "[field-sizing:fixed] min-h-[150px] resize-y leading-normal",
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot anti-spam: fora da tela e fora da ordem de tabulação. */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="contact-company">Não preencha</label>
          <input
            id="contact-company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("company")}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-12 justify-self-start px-[1.35rem] text-base font-semibold disabled:cursor-progress disabled:opacity-65"
        >
          {pending ? f.sending : f.submit}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "min-h-[1.6em] text-sm",
            status?.tone === "ok" && "text-brand",
            status?.tone === "error" && "text-signal",
          )}
        >
          {status?.text}
          {status?.withEmail && (
            <>
              {" "}
              <a href={`mailto:${links.email}`} className="text-inherit underline">
                {links.email}
              </a>
              .
            </>
          )}
        </p>
      </form>
    </Form>
  );
}
