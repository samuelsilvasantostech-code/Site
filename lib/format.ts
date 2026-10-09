/** "https://www.linkedin.com/in/x/" → "linkedin.com/in/x". */
export function prettyUrl(url: string) {
  return url
    .replace(/^mailto:/, "")
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");
}
