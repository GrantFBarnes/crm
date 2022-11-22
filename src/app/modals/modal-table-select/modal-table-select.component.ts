import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import * as sort from 'src/app/shared/methods/sort';

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

  selectId(): void {
    this.emitSelectId.emit(this.id);
    this.id = '';
    document
      .getElementById('app-modal-table-select-' + this.table + '-close-button')
      ?.click();
  }

  getData(): void {
    if (!this.table) return;

    this.httpService
      .get('/api/crm/table/' + this.table)
      .subscribe((data: any) => {
        this.data = data.sort(sort.sortByName);
      });
  }
}
