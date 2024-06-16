export function formatTableDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo'
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export function formatInputDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDayMonth(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    timeZone: 'America/Sao_Paulo'
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}