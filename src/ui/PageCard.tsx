import type { ReactNode } from "react";

type PageCardProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
};

export function PageCard({ eyebrow, title, description, children }: PageCardProps) {
  return (
    <section className="ui-card">
      {eyebrow ? <p className="ui-card__eyebrow">{eyebrow}</p> : null}
      <h1 className="ui-card__title">{title}</h1>
      {description ? <div className="ui-card__desc">{description}</div> : null}
      <div className="ui-card__body">{children}</div>
    </section>
  );
}
