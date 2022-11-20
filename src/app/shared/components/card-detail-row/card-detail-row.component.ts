import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-card-detail-row',
  templateUrl: './card-detail-row.component.html',
  providers: [HttpService],
  styleUrls: ['./card-detail-row.component.css'],
})
export class CardDetailRowComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';
  @Input() link_table: string = '';
  @Input() data: any = {};
  @Input() columns: TableColumn[] = [];
  @Input() edit_mode: boolean = false;
  @Output() emitSaveData = new EventEmitter<any>();
  @Output() emitDeleteData = new EventEmitter<string>();

  data_edit: any = {};
  pending_changes: boolean = false;
  link_data: any = {};

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.data_edit = JSON.parse(JSON.stringify(this.data));
    this.pending_changes = false;
    this.getLinkData();
  }

  checkPendingChanges(): void {
    this.pending_changes =
      JSON.stringify(this.data) != JSON.stringify(this.data_edit);
  }

  saveData(): void {
    this.emitSaveData.emit(this.data_edit);
  }

  deleteData(): void {
    this.emitDeleteData.emit(this.data.id);
  }

  getLinkData(): void {
    if (!this.link_table) return;

    const id = this.data[this.link_table + '_id'];
    if (!id) return;

    this.httpService
      .get('/api/crm/table/' + this.link_table + '/id/' + id)
      .subscribe((data: any) => {
        this.link_data = data;
      });
  }

  getDisplayString(): string {
    let result = '';
    switch (this.title) {
      case 'Phone':
      case 'Email':
        result = this.data.value || '(No ' + this.title + ')';
        break;

      case 'Address':
        if (this.data.city) {
          result += this.data.city;
          if (this.data.state) result += ', ';
        }
        if (this.data.state) {
          result += this.data.state;
        }
        if (this.data.zip) {
          if (result) result += ' ';
          result += this.data.zip;
        }
        if (!result) result = '(No Address)';
        break;

      case 'Note':
        result = this.data.details || '(No ' + this.title + ')';
        break;

      case 'Log':
        if (this.data.date) {
          result += this.data.date;
        }
        if (this.data.time) {
          if (result) result += ', ';
          result += this.data.time;
        }
        if (this.data.details) {
          if (result) result += '\n';
          result += this.data.details;
        }
        break;

      default:
        break;
    }
    if (result) return result;
    return '(No Data)';
  }
}
