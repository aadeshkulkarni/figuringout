export function formatDate(date: { toLocaleString: (arg0: string, arg1: { weekday: string; year: string; month: string; day: string; hour: string; minute: string; hour12: boolean; }) => string; }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(",", " at");
}
