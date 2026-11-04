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
  minWords?: number;
  minLines?: number;
  when?: { field: string; is: string[] };
};
