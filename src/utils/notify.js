// Helpers for WhatsApp / SMS links. We use click-to-chat links so the portal
// works without paid gateway credentials.

export function normalizePhone(phone) {
  const digits = String(phone ?? '').replace(/\D/g, '')
  if (!digits) return ''
  // Assume Indian numbers when a 10-digit number is entered.
  if (digits.length === 10) return `91${digits}`
  return digits
}

export function whatsappLink(phone, message) {
  const number = normalizePhone(phone)
  const text = encodeURIComponent(message)
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
}

export function smsLink(phone, message) {
  const number = normalizePhone(phone)
  const separator = /iPhone|iPad|Macintosh/.test(navigator.userAgent) ? '&' : '?'
  return `sms:${number}${separator}body=${encodeURIComponent(message)}`
}

export function periodText(period) {
  return Number(period) === 0 ? 'Zero Period' : `Period ${period}`
}

export function buildSubstitutionMessage(substitution) {
  return [
    '🔔 SUBSTITUTION ALERT',
    '',
    `Class: ${substitution.classSection}`,
    `Period: ${periodText(substitution.period)}`,
    `Absent Teacher: ${substitution.absentTeacher}`,
    `Substitute Teacher: ${substitution.substitute}`,
    `Date: ${new Date().toLocaleDateString('en-GB')}`,
    '',
    '— School Coordinator Portal',
  ].join('\n')
}

export function buildNoticeMessage(title, body) {
  return ['📢 SCHOOL NOTICE', '', title, '', body, '', '— School Coordinator Portal']
    .filter((line) => line !== undefined && line !== null)
    .join('\n')
}

export function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  const area = document.createElement('textarea')
  area.value = text
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  document.body.removeChild(area)
  return Promise.resolve()
}
