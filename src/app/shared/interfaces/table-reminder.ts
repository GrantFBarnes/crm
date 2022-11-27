export interface TableReminder {
  id: string;
  user_id: string;

  name: string;
  details: string;
  date: string;
  time: string;
  repeating: boolean;
  repeat_interval: string;
  repeat_weekly_gap: number;
  repeat_weekly_monday: boolean;
  repeat_weekly_tuesday: boolean;
  repeat_weekly_wednesday: boolean;
  repeat_weekly_thursday: boolean;
  repeat_weekly_friday: boolean;

  date_added: Date;
  date_modified: Date;
}
