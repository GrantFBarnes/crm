import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  providers: [HttpService],
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';
  @Input() columns: TableColumn[] = [];

  loading: boolean = true;

  search_text: string = '';
  data: any[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('/api/authentication/user').subscribe({
      next: () => {
        this.getData();
      },
      error: () => {
        window.location.href = '/crm/login';
      },
    });
  }

  getData(): void {
    this.httpService
      .get('/api/crm/table/' + this.table)
      .subscribe((data: any) => {
        this.data = data.sort(this.sortMethod);
        this.loading = false;
      });
  }

  addRow(): void {
    this.loading = true;
    this.httpService
      .post('/api/crm/table/' + this.table, {})
      .subscribe((data: any) => {
        this.openRow(data);
      });
  }

  openRow(id: string): void {
    window.location.href = '/crm/' + this.table + '/' + id;
  }

  sortMethod = (a: any, b: any): number => {
    let a_val = '';
    let b_val = '';
    for (let i in this.columns) {
      a_val += a[this.columns[i].field];
      b_val += b[this.columns[i].field];
    }
    a_val = a_val.toLocaleLowerCase();
    b_val = b_val.toLocaleLowerCase();
    if (a_val < b_val) return -1;
    if (a_val > b_val) return 1;
    return 0;
  };

  searchTextInRow(row: any): boolean {
    const search_text = this.search_text.trim().toLocaleLowerCase();
    if (!search_text) return true;
    for (let i in this.columns) {
      if (
        row[this.columns[i].field].toLocaleLowerCase().includes(search_text)
      ) {
        return true;
      }
    }
    return false;
  }
}
