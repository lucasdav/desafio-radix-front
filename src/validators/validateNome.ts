import { AlertMessageProps } from "../enum/AlertMessageProps";

export function validateNome(value: string): string | undefined {
  if (!value) return AlertMessageProps.campoObrigatorio;
  if (value.length < 3) return AlertMessageProps.nomeInvalido;
  return '';
}