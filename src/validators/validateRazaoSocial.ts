import { AlertMessageProps } from "../enum/AlertMessageProps";

export function validateRazaoSocial(value: string): string | undefined {
  if (!value) return AlertMessageProps.campoObrigatorio;
  return '';
}