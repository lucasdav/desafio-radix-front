import { AlertMessageProps } from "../enum/AlertMessageProps";

export function validateEmail(value: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return AlertMessageProps.campoObrigatorio;
    if (!emailRegex.test(value)) return AlertMessageProps.emailInvalido;

    return '';
}