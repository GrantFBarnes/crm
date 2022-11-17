import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
})
export class DetailCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any = {};
  @Input() columns: { [name: string]: string } = {};
  @Input() edit_mode: boolean = false;
  @Output() emitSaveData = new EventEmitter<any>();
  @Output() emitDeleteData = new EventEmitter<string>();

  data_edit: any = {};
  pending_changes: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.data_edit = JSON.parse(JSON.stringify(this.data));
    this.pending_changes = false;
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

  getDisplayString(): string {
    let result = '';
    switch (this.title) {
      case 'Phone':
      case 'Email':
      case 'Note':
        const field = this.title.toLocaleLowerCase();
        result = this.data[field] || '(No ' + this.title + ')';
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
          result += new Date(this.data.date).toDateString();
        }
        if (this.data.time) {
          if (result) result += ' - ';
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
