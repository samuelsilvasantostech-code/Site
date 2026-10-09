/** "https://www.linkedin.com/in/x/" → "linkedin.com/in/x". */
export function prettyUrl(url: string) {
  return url
    .replace(/^mailto:/, "")
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");
}

/** Link do WhatsApp com a mensagem já digitada. */
export function whatsappUrl(base: string, message: string) {
  const url = new URL(base);
  url.searchParams.set("text", message);
  return url.toString();
}
