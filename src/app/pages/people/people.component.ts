import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  columns: TableColumn[] = [
    { field: 'first_name', title: 'First Name' },
    { field: 'last_name', title: 'Last Name' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
