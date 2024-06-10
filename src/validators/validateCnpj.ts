import { AlertMessageProps } from "../enum/AlertMessageProps";

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export function validateCnpj(value: string): string | undefined {
  if (!value) return AlertMessageProps.campoObrigatorio;
  if (!cnpjRegex.test(value)) return AlertMessageProps.cnpjInvalido;

  return '';
}