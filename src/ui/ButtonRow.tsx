import type { ReactNode } from "react";

export function ButtonRow({ children }: { children: ReactNode }) {
  return <div className="ui-btn-row">{children}</div>;
}
