import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  providers: [HttpService],
  styleUrls: ['./detail-card.component.css'],
})
export class DetailCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';
  @Input() data: any = {};
  @Input() parent_table: string = '';
  @Input() columns: TableColumn[] = [];
  @Input() edit_mode: boolean = false;
  @Output() emitSaveData = new EventEmitter<any>();
  @Output() emitDeleteData = new EventEmitter<string>();

  data_edit: any = {};
  pending_changes: boolean = false;
  linked_data: any = {};
  linked_table: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.data_edit = JSON.parse(JSON.stringify(this.data));
    this.pending_changes = false;
    this.getLinkedData();
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

  getLinkedData(): void {
    this.linked_table = '';

    if (this.table == 'job') {
      if (this.parent_table == 'company') {
        this.linked_table = 'person';
      } else {
        this.linked_table = 'company';
      }
    } else if (this.table.includes('task')) {
      this.linked_table = 'task';
    }

    if (this.linked_table) {
      const id = this.data[this.linked_table + '_id'];
      if (!id) return;
      this.httpService
        .get('/api/crm/table/' + this.linked_table + '/id/' + id)
        .subscribe((data: any) => {
          this.linked_data = data;
        });
    }
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

      case 'Contact Log':
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
