import type { ComponentPropsWithoutRef } from "react";

export type SelectFieldProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
  containerClassName?: string;
};

export function SelectField({
  label,
  containerClassName,
  ...props
}: SelectFieldProps) {
  return (
    <label className={containerClassName}>
      <span>{label}</span>
      <select aria-label={label} {...props} />
    </label>
  );
}
