import { TableReminder } from 'src/app/shared/interfaces/table-reminder';

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

function getDateFromISO(iso: string): Date | null {
  if (!iso_date_regex.test(iso)) return null;
  return new Date(
    parseInt(iso.substring(0, 4)),
    parseInt(iso.substring(5, 7)) - 1,
    parseInt(iso.substring(8))
  );
}

function getISOFromDate(date: Date): string {
  return date.toISOString().substring(0, 10);
}

function getTodayDate(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function dateIsWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function addDayToDate(date: Date): Date {
  date.setDate(date.getDate() + 1);
  return date;
}

export function getTodayISO(): string {
  return getISOFromDate(getTodayDate());
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

export function getReminderRepeatISO(reminder: TableReminder): string {
  if (!reminder.repeating) return reminder.date;
  if (!iso_date_regex.test(reminder.date)) return reminder.date;

  let date = getDateFromISO(reminder.date);
  if (!date) return reminder.date;

  const today = getTodayDate();

  if (reminder.repeat_interval == 'work_day') {
    do {
      date = addDayToDate(date);
    } while (date < today || dateIsWeekend(date));
  } else if (reminder.repeat_interval == 'day') {
    do {
      date = addDayToDate(date);
    } while (date < today);
  } else if (reminder.repeat_interval == 'week') {
    const valid_days = new Set();
    if (reminder.repeat_weekly_sunday) valid_days.add(0);
    if (reminder.repeat_weekly_monday) valid_days.add(1);
    if (reminder.repeat_weekly_tuesday) valid_days.add(2);
    if (reminder.repeat_weekly_wednesday) valid_days.add(3);
    if (reminder.repeat_weekly_thursday) valid_days.add(4);
    if (reminder.repeat_weekly_friday) valid_days.add(5);
    if (reminder.repeat_weekly_saturday) valid_days.add(6);
    if (valid_days.size == 0) return reminder.date;

    do {
      date = addDayToDate(date);

      // if sunday (start of week)
      if (date.getDay() === 0) {
        // forward to the week with the specified gap
        date.setDate(date.getDate() + 7 * (reminder.repeat_weekly_gap - 1));
      }
    } while (date < today || !valid_days.has(date.getDay()));
  }

  return getISOFromDate(date);
}
