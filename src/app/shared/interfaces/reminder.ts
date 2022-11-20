export interface Reminder {
  id: string;
  user_id: string;

  name: string;
  details: string;
  date: string;
  time: string;
  repeating: boolean;
  repeat_count: number;
  repeat_interval: string;

  date_added: Date;
  date_modified: Date;
}
