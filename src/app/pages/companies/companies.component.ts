import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
