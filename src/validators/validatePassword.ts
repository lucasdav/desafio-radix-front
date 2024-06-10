import { AlertMessageProps } from "../enum/AlertMessageProps";

export function validatePassword(value: string): string | undefined {
  if (!value) return AlertMessageProps.campoObrigatorio;
  return value.length < 6 ? AlertMessageProps.senhaInvalida : undefined;
}