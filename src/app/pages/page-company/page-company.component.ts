import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-page-company',
  templateUrl: './page-company.component.html',
  styleUrls: ['./page-company.component.css'],
})
export class PageCompanyComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
