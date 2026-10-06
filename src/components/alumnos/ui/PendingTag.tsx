import { monoLabel } from "./styles";

type PendingTagProps = {
  children?: string;
};

/** Marca discreta para huecos estructurales sin contenido real todavía. */
export default function PendingTag({ children = "Pendiente" }: PendingTagProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border border-dashed border-campus-line-strong px-2.5 py-1 leading-none text-campus-subtle ${monoLabel} !text-[10px]`}
    >
      {children}
    </span>
  );
}
