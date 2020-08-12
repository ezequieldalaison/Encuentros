export function getCurrentMonth() {
  const monthId = new Intl.DateTimeFormat("en", {
    month: "numeric"
  }).format(new Date());

  return parseInt(monthId);
}
