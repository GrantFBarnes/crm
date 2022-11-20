import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
})
export class RemindersComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
