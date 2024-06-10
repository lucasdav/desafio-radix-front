import { AlertMessageProps } from "../enum/AlertMessageProps";

export function validateTelefone(value: string): string | undefined {
  const telefoneRegex = /^\(\d{2}\) \d{4}-\d{5}$/;
  if (!value) return AlertMessageProps.campoObrigatorio;
  if (!telefoneRegex.test(value)) return AlertMessageProps.telefoneInvalido;

  return '';
}