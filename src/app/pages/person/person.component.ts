import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  columns: TableColumn[] = [
    { field: 'first_name', title: 'First Name' },
    { field: 'last_name', title: 'Last Name' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
