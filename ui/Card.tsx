import type { ComponentPropsWithoutRef } from "react";

export type CardProps = ComponentPropsWithoutRef<"article">;

export function Card({ className, ...props }: CardProps) {
  const classes = className ? `card ${className}` : "card";

  return <article className={classes} {...props} />;
}
