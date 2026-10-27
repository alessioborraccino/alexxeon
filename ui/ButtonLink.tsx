import Link from "next/link";
import type { ComponentProps } from "react";

export type ButtonLinkProps = ComponentProps<typeof Link>;

export function ButtonLink({ className, ...props }: ButtonLinkProps) {
  const classes = className ? `button ${className}` : "button";

  return <Link className={classes} {...props} />;
}
