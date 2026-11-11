import type { ComponentPropsWithoutRef } from "react";

export type PageProps = Omit<ComponentPropsWithoutRef<"main">, "id">;

/** The single main landmark targeted by the site skip link. */
export function Page(props: PageProps) {
  return <main {...props} id="main" />;
}
