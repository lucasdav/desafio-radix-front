import { AlertMessageProps } from "../enum/AlertMessageProps";

export function validateCpf(value: string): string | undefined {
  const cpf = value.replace(/[^\d]+/g, '');
  if (!value) return AlertMessageProps.campoObrigatorio;
  if (cpf === '') return AlertMessageProps.campoObrigatorio;
  if (cpf.length !== 11) return AlertMessageProps.cpfInvalido;
  if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') return AlertMessageProps.cpfInvalido;
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return AlertMessageProps.cpfInvalido;
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return AlertMessageProps.cpfInvalido;
  return '';
}