"use client";

import type { ReactNode } from "react";

type CollapsibleSectionProps = {
  title: string;
  eyebrow?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function CollapsibleSection({
  title,
  eyebrow,
  badge,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  return (
    <details className="collapsible-section" open={defaultOpen}>
      <summary className="collapsible-summary">
        <div>
          {eyebrow && <span className="collapsible-eyebrow">{eyebrow}</span>}
          <strong>{title}</strong>
        </div>

        <div className="collapsible-meta">
          {badge && <span className="section-badge">{badge}</span>}
          <span className="collapsible-chevron" aria-hidden="true">
            ↓
          </span>
        </div>
      </summary>

      <div className="collapsible-content">{children}</div>
    </details>
  );
}