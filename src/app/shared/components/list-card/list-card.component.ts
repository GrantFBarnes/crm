import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  providers: [HttpService],
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';
  @Input() parent_field: string = '';
  @Input() parent_id: string = '';
  @Input() columns: TableColumn[] = [];

  loading: boolean = true;

  edit_mode: boolean = false;
  data: any[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.getData();
  }

  getData(): void {
    if (!this.parent_field) return;
    if (!this.parent_id) return;

    let api =
      '/api/crm/table/' +
      this.table +
      '/fk/' +
      this.parent_field +
      '/' +
      this.parent_id;

    this.httpService.get(api).subscribe((data: any) => {
      this.data = data.sort(this.sortMethod);
      this.loading = false;
    });
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

  enterEditMode(): void {
    this.edit_mode = true;
  }

  exitEditMode(): void {
    this.edit_mode = false;
  }

  saveData(data: any): void {
    this.loading = true;
    this.httpService.put('/api/crm/table/' + this.table, data).subscribe(() => {
      this.getData();
    });
  }

  deleteData(id: string): void {
    if (window.confirm(`Are you sure you want to delete this ${this.title}?`)) {
      this.loading = true;
      this.httpService
        .delete('/api/crm/table/' + this.table + '/id/' + id)
        .subscribe(() => {
          this.getData();
        });
    }
  }

  addRow(body: any): void {
    this.loading = true;

    if (!body) {
      body = { [this.parent_field]: this.parent_id };
    }

    this.httpService
      .post('/api/crm/table/' + this.table, body)
      .subscribe(() => {
        this.getData();
        this.enterEditMode();
      });
  }

  addJob(id: string): void {
    let body = { company_id: '', person_id: '' };
    if (this.parent_field == 'company_id') {
      body.company_id = this.parent_id;
      body.person_id = id;
    } else {
      body.company_id = id;
      body.person_id = this.parent_id;
    }
    this.addRow(body);
  }
}
