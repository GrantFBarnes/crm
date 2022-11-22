export interface TableTask {
  id: string;
  user_id: string;

  name: string;
  details: string;
  completed: boolean;

  date_added: Date;
  date_modified: Date;
}
