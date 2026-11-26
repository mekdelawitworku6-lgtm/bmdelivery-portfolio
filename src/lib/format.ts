export function money(value: number): string {
  return `ETB ${value.toLocaleString('en-US')}`
}

export function shortTime(date = new Date()): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function percent(value: number, total: number): string {
  if (!total) return '0%'
  return `${Math.round((value / total) * 100)}%`
}
