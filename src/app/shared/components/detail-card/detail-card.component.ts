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
    if (this.table == 'job') {
      let api = '/api/crm/table/';

      if (this.parent_table == 'company') {
        if (!this.data.person_id) return;
        this.linked_table = 'person';
        api += this.linked_table + '/id/' + this.data.person_id;
      } else {
        if (!this.data.company_id) return;
        this.linked_table = 'company';
        api += this.linked_table + '/id/' + this.data.company_id;
      }

      this.httpService.get(api).subscribe((data: any) => {
        this.linked_data = data;
      });
    }
  }

  getDisplayString(): string {
    let result = '';
    switch (this.title) {
      case 'Phone':
      case 'Email':
      case 'Note':
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

      case 'Contact Log':
        if (this.data.date) {
          result += this.data.date;
        }
        if (this.data.time) {
          if (result) result += ', ';
          result += this.data.time;
        }
        if (this.data.description) {
          if (result) result += '\n';
          result += this.data.description;
        }
        break;

      default:
        break;
    }
    if (result) return result;
    return '(No Data)';
  }
}
