import type { InputHTMLAttributes } from "react";
import { fieldErrorClasses, inputClasses, inputErrorClasses, labelClasses } from "./fieldStyles";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id"> & {
  id: string;
  label: string;
  error?: string;
};

export default function TextField({ id, label, error, ...inputProps }: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${inputClasses} ${error ? inputErrorClasses : ""}`}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} className={fieldErrorClasses}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
