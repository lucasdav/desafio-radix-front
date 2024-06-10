import { AlertMessageProps } from "../enum/AlertMessageProps";

export function validateDataNascimento(value: string): string | undefined {
  const dataNascimentoRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!value) return AlertMessageProps.campoObrigatorio;
  if (!dataNascimentoRegex.test(value)) return AlertMessageProps.dataNascimentoInvalida;

  return '';
}