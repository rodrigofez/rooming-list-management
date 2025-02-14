export function validateDate(dateStr: string) {
  dateStr = dateStr.replace(/\//g, "-");

  if (/^\d{4}$/.test(dateStr)) {
    dateStr += "-01-01";
  }

  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    dateStr += "-01";
  }

  const date = new Date(dateStr);
  const isValid =
    !isNaN(date.getTime()) && dateStr === date.toISOString().split("T")[0];

  return isValid ? date.toISOString().split("T")[0] : null;
}
