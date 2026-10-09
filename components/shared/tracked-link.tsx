"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  eventData?: Record<string, string>;
};

/** Link que registra um evento de conversão no clique. */
export function TrackedLink({ event, eventData, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, eventData);
        onClick?.(e);
      }}
    />
  );
}
