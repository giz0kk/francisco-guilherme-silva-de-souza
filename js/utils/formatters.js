/**
 * Funções de formatação (moeda, datas e horários) no padrão brasileiro.
 * Todas recebem um valor e devolvem um texto pronto para a tela.
 */

/** Completa com zero à esquerda: 5 -> "05" */
function padNumber(value) {
  return String(value).padStart(2, '0');
}

/** 24.9 -> "R$ 24,90" */
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Deixa a primeira letra maiúscula: "outubro" -> "Outubro" */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "2026-10-27" -> objeto Date (no fuso local) */
function parseDateInput(dateText) {
  const parts = dateText.split('-');
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

/** Date -> "2026-10-27" (formato do <input type="date">) */
function toDateInputValue(date) {
  return date.getFullYear() + '-' + padNumber(date.getMonth() + 1) + '-' + padNumber(date.getDate());
}

/** Date -> "15:42" */
function formatClock(date) {
  return padNumber(date.getHours()) + ':' + padNumber(date.getMinutes());
}

/** "2026-10-27" -> "Ter., 27 de out." */
function formatDateLabel(dateText) {
  const date = parseDateInput(dateText);
  return capitalize(date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }));
}

/** Soma minutos a um horário: ("09:55", 10) -> "10:05" */
function addMinutesToTime(timeText, minutes) {
  const parts = timeText.split(':');
  const date = new Date();
  date.setHours(Number(parts[0]), Number(parts[1]) + minutes);
  return formatClock(date);
}

/** "09:05" -> "09:05 – 09:15" (janela de embarque de 10 minutos) */
function formatTimeWindow(timeText) {
  return timeText + ' – ' + addMinutesToTime(timeText, 10);
}

/** Horário atual + 15 minutos, arredondado de 5 em 5 -> "15:35" */
function getSuggestedTime() {
  const date = new Date();
  date.setMinutes(Math.ceil((date.getMinutes() + 15) / 5) * 5);
  return formatClock(date);
}

/** true se a data + horário escolhidos já passaram */
function isPastDateTime(dateText, timeText) {
  const date = parseDateInput(dateText);
  const parts = timeText.split(':');
  date.setHours(Number(parts[0]), Number(parts[1]));
  return date < new Date();
}

/** { date: "2026-10-27", time: "15:30" } -> "27/10, 15:30" */
function formatScheduleShort(schedule) {
  const date = parseDateInput(schedule.date);
  return padNumber(date.getDate()) + '/' + padNumber(date.getMonth() + 1) + ', ' + schedule.time;
}

/** Data ISO -> "14 de set., 17:19" */
function formatTripDate(isoText) {
  const date = new Date(isoText);
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) + ', ' + formatClock(date);
}

/** Data ISO -> "Setembro de 2026" */
function formatMonthYear(isoText) {
  const date = new Date(isoText);
  return capitalize(date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }));
}

/**
 * Agrupa as viagens por mês (mais recentes primeiro).
 * Retorno: [{ label: 'Setembro de 2026', trips: [...] }, ...]
 */
function groupTripsByMonth(trips) {
  const sorted = [...trips].sort((a, b) => new Date(b.date) - new Date(a.date));
  const groups = [];

  sorted.forEach((trip) => {
    const label = formatMonthYear(trip.date);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.label === label) {
      lastGroup.trips.push(trip);
    } else {
      groups.push({ label: label, trips: [trip] });
    }
  });

  return groups;
}
