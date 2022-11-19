import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  columns: TableColumn[] = [
    { field: 'name', title: 'Name' },
    { field: 'date', title: 'Date' },
    { field: 'time', title: 'Time' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
