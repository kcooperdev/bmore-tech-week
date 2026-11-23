export type ApplyChoice = {
  value: string;
  label: string;
};

export type ApplyField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea" | "select" | "checks" | "radio";
  required?: boolean;
  options?: string[];
  choices?: ApplyChoice[];
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  step?: string;
  wide?: boolean;
  /** Show this field only when another field matches. Set merge to fold the value into the watched field on submit (city detail). */
  when?: { field: string; is: string[]; merge?: boolean };
};
