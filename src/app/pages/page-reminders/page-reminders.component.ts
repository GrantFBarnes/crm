import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-page-reminders',
  templateUrl: './page-reminders.component.html',
  styleUrls: ['./page-reminders.component.css'],
})
export class PageRemindersComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
