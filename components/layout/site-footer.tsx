import { footer, profile, ui } from "@/content/data";

import { CurrentYear } from "./current-year";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted-foreground">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p>
          © <CurrentYear /> {profile.name}. {footer.note}
        </p>
        <a href="#topo" className="text-foreground underline-offset-3">
          {ui.backToTop}
        </a>
      </div>
    </footer>
  );
}
