import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-page-tasks',
  templateUrl: './page-tasks.component.html',
  styleUrls: ['./page-tasks.component.css'],
})
export class PageTasksComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
