import { Component, OnInit } from '@angular/core';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  columns: TableColumn[] = [{ field: 'name', title: 'Name' }];

  constructor() {}

  ngOnInit(): void {}
}
