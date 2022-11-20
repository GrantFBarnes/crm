import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-page-reminder',
  templateUrl: './page-reminder.component.html',
  styleUrls: ['./page-reminder.component.css'],
})
export class PageReminderComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
