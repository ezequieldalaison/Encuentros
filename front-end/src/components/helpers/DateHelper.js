export function getCurrentMonth() {
  const monthId = new Intl.DateTimeFormat("en", {
    month: "numeric"
  }).format(new Date());

  return parseInt(monthId);
}

export function formatFullDate(date) {
  var d = convertDateTime(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}/${mo}/${ye}`;
}

export function formatDateWithoutYear(date) {
  if (!date) return "";
  var d = convertDateTime(date);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}/${mo}`;
}

export function isToday(date) {
  if (!date) return false;

  var d = convertDateTime(date);
  var d1 = new Date();
  const formatted = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).format(d);
  const formatted1 = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).format(d1);

  return formatted === formatted1;
}

export function isLowerThanToday(date) {
  if (!date) return false;

  var d = convertDateTime(date);
  var d1 = new Date();

  return d1 > d;
}

export function getMonthName(date) {
  var d = convertDateTime(date);
  const mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
  return Months[mo];
}

const Months = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre"
};

function convertDateTime(date) {
  var d = new Date(date);
  var c = new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
  return c;
}
