import type { ButtonHTMLAttributes } from "react";

type BtnVariant = "primary" | "ghost";
type BtnSize = "md" | "sm";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant;
  size?: BtnSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const bits = ["ui-btn", variant === "primary" ? "ui-btn--primary" : "ui-btn--ghost"];
  if (size === "sm") bits.push("ui-btn--sm");
  if (className) bits.push(className);
  return <button type={type} className={bits.join(" ")} {...rest} />;
}
