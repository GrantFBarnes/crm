const iso_date_regex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/;
const time_24_regex = /^([01]\d|[2][0-3]):[0-5]\d$/;
const time_12_regex = /^([0][1-9]|[1][0-2]):[0-5]\d [AP]M$/;

////////////////////////////////////////////////////////////////////////////////
// Time Functions

export function get12HourTime(time: string): string {
  if (!time_24_regex.test(time)) return time;

  let hour_int = parseInt(time.substring(0, 2));
  let m = 'AM';
  if (hour_int >= 12) {
    hour_int = hour_int - 12;
    m = 'PM';
  }
  if (hour_int == 0) {
    hour_int = 12;
  }

  const hour = hour_int.toString().padStart(2, '0');
  const min = time.substring(3, 5);
  return `${hour}:${min} ${m}`;
}

export function get24HourTime(time: string): string {
  if (!time_12_regex.test(time)) return time;

  let hour_int = parseInt(time.substring(0, 2));
  const m = time.substring(6);
  if (m == 'PM') {
    hour_int = hour_int + 12;
  }
  if (hour_int == 12 || hour_int == 24) {
    hour_int = hour_int - 12;
  }

  const hour = hour_int.toString().padStart(2, '0');
  const min = time.substring(3, 5);
  return `${hour}:${min}`;
}

////////////////////////////////////////////////////////////////////////////////
// Date Functions

export function getDateFromISO(iso: string): Date | null {
  if (!iso_date_regex.test(iso)) return null;
  return new Date(
    parseInt(iso.substring(0, 4)),
    parseInt(iso.substring(5, 7)) - 1,
    parseInt(iso.substring(8))
  );
}

export function getStringFromISO(iso: string): string {
  const date = getDateFromISO(iso);
  if (!date) return iso;
  const today = getTodayISO();
  if (today == iso) {
    return date.toDateString() + ' (Today)';
  }
  return date.toDateString();
}

export function getISOFromDate(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export function getTodayDate(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function getTodayISO(): string {
  return getISOFromDate(getTodayDate());
}

export function getRepeatingISO(
  iso: string,
  repeat_interval: string,
  repeat_count: number
): string {
  if (!iso_date_regex.test(iso)) return iso;

  const today = getTodayDate();

  let date = getDateFromISO(iso);
  if (!date) return iso;

  switch (repeat_interval) {
    case 'day':
      while (date < today) {
        date.setDate(date.getDate() + repeat_count);
      }
      break;

    case 'week':
      while (date < today) {
        date.setDate(date.getDate() + repeat_count * 7);
      }
      break;

    case 'month':
      while (date < today) {
        date.setMonth(date.getMonth() + repeat_count);
      }
      break;

    case 'year':
      while (date < today) {
        date.setFullYear(date.getFullYear() + repeat_count);
      }
      break;

    default:
      break;
  }
  return getISOFromDate(date);
}
