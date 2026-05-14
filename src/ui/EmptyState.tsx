import type { ReactNode } from "react";

type Tone = "info" | "success";

type EmptyStateProps = {
  title: string;
  description?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
};

export function EmptyState({ title, description, tone = "info", children }: EmptyStateProps) {
  const toneClass = tone === "success" ? "ui-empty--success" : "";

  return (
    <div className={`ui-empty ${toneClass}`.trim()} role="status">
      <div className="ui-empty__icon" aria-hidden>
        {tone === "success" ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div>
        <p className="ui-empty__title">{title}</p>
        {description ? <div className="ui-empty__desc">{description}</div> : null}
        {children}
      </div>
    </div>
  );
}
