export function telefoneMaskFormat(value: string): string {
  return value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(\d{4})(\d{1,4})$/, '$1$2');
}