function formatDateToMonthDay(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatDateRange(rangeStr: string): string {
  const [startStr, endStr] = rangeStr.split("–").map((s) => s.trim());
  const startDate = new Date(startStr);
  const endDate = new Date(endStr);

  const month = startDate.toLocaleString("en-US", { month: "long" });
  const year = startDate.getFullYear();

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  return `${startDay} to ${endDay} ${month} ${year}`;
}

export { formatDateToMonthDay, formatDateRange };
