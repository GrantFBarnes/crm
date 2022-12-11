import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

import * as sort from 'src/app/shared/methods/sort';

@Component({
  selector: 'app-card-list-table',
  templateUrl: './card-list-table.component.html',
  providers: [HttpService],
  styleUrls: ['./card-list-table.component.css'],
})
export class CardListTableComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';
  @Input() parent_field: string = '';
  @Input() parent_id: string = '';
  @Input() link_table: string = '';
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
    if (!this.table) return;
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
      this.data = data.sort(sort.sortBySortName);
      this.loading = false;
    });
  }

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

    if (!body) body = {};
    body[this.parent_field] = this.parent_id;

    this.httpService
      .post('/api/crm/table/' + this.table, body)
      .subscribe(() => {
        this.getData();
        this.enterEditMode();
      });
  }

  addLink(id: string): void {
    this.addRow({ [this.link_table + '_id']: id });
  }
}
