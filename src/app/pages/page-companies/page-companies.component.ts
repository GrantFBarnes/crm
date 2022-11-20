import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-page-companies',
  templateUrl: './page-companies.component.html',
  styleUrls: ['./page-companies.component.css'],
})
export class PageCompaniesComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
