import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-page-list-table',
  templateUrl: './page-list-table.component.html',
  providers: [HttpService],
  styleUrls: ['./page-list-table.component.css'],
})
export class PageListTableComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';

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
    const a_val = a.name.toLocaleLowerCase();
    const b_val = b.name.toLocaleLowerCase();
    if (a_val < b_val) return -1;
    if (a_val > b_val) return 1;
    return 0;
  };

  searchTextInRow(row: any): boolean {
    const search_text = this.search_text.trim().toLocaleLowerCase();
    if (!search_text) return true;
    if (row.name.toLocaleLowerCase().includes(search_text)) return true;
    return false;
  }
}
