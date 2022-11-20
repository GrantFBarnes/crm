import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
