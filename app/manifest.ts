import type { MetadataRoute } from "next";

import { profile } from "@/content/data";
import { THEME_COLOR_DARK } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: profile.shortName,
    lang: "pt-BR",
    start_url: "/",
    display: "browser",
    background_color: THEME_COLOR_DARK,
    theme_color: THEME_COLOR_DARK,
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
