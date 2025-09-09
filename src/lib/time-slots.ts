export function generateTimeSlots(start: string, end: string, interval: number = 25): string[] {
  const slots: string[] = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    slots.push(time);
    m += interval;
    if (m >= 60) {
      h += 1;
      m = m % 60;
    }
  }

  return slots;
}
