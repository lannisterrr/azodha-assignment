const STEPS = [
  { step: 1, label: "Profile" },
  { step: 2, label: "Songs" },
  { step: 3, label: "Pay" },
  { step: 4, label: "Done" },
] as const;

export function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="ui-steps" aria-label="Steps">
      {STEPS.map((s) => {
        const done = current > s.step;
        const here = current === s.step;
        const itemClass = [
          "ui-steps__item",
          done ? "ui-steps__item--done" : "",
          here ? "ui-steps__item--current" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={s.step} className={itemClass} aria-current={here ? "step" : undefined}>
            <span className="ui-steps__dot" aria-hidden>
              {done ? "✓" : s.step}
            </span>
            <span className="ui-steps__name">{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
