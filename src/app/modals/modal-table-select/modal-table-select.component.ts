import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-modal-table-select',
  templateUrl: './modal-table-select.component.html',
  providers: [HttpService],
  styleUrls: ['./modal-table-select.component.css'],
})
export class ModalTableSelectComponent implements OnInit {
  @Input() table: string = '';
  @Output() emitSelectId = new EventEmitter<string>();

  data: any[] = [];
  id: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.getData();
  }

  getDisplayStr(row: any): string {
    switch (this.table) {
      case 'company':
        return row.name;

      case 'person':
        return row.first_name + ' ' + row.last_name;

      default:
        return '';
    }
  }

  selectId(): void {
    this.emitSelectId.emit(this.id);
    this.id = '';
    document.getElementById('modal-close-button')?.click();
  }

  getData(): void {
    if (!this.table) return;

    this.httpService
      .get('/api/crm/table/' + this.table)
      .subscribe((data: any) => {
        this.data = data.sort(this.sortMethod);
      });
  }

  sortMethod = (a: any, b: any): number => {
    let a_val = '';
    let b_val = '';
    switch (this.table) {
      case 'company':
        a_val = a.name;
        b_val = b.name;
        break;

      case 'person':
        a_val = a.first_name + ' ' + a.last_name;
        b_val = b.first_name + ' ' + b.last_name;
        break;

      default:
        break;
    }
    a_val = a_val.toLocaleLowerCase();
    b_val = b_val.toLocaleLowerCase();
    if (a_val < b_val) return -1;
    if (a_val > b_val) return 1;
    return 0;
  };
}
