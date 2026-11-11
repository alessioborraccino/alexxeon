import type { ComponentPropsWithoutRef } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  const classes = className ? `button ${className}` : "button";
  return <button type={type} className={classes} {...props} />;
}
