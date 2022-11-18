import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  providers: [HttpService],
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  @Input() table: string = '';
  @Input() list_page: string = '';
  @Input() columns: TableColumn[] = [];

  phone_columns: TableColumn[] = [{ field: 'phone', title: 'Phone' }];
  email_columns: TableColumn[] = [{ field: 'email', title: 'Email' }];
  address_columns: TableColumn[] = [
    { field: 'city', title: 'City' },
    { field: 'state', title: 'State' },
    { field: 'zip', title: 'Zip' },
  ];
  note_columns: TableColumn[] = [{ field: 'note', title: 'Note' }];
  contact_columns: TableColumn[] = [
    { field: 'date', title: 'Date' },
    { field: 'time', title: 'Time' },
    { field: 'description', title: 'Description' },
  ];

  loading: boolean = true;

  edit_mode: boolean = true;
  data: any = {};
  data_edit: any = JSON.parse(JSON.stringify(this.data));
  pending_changes: boolean = false;

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

  enterEditMode(): void {
    this.data_edit = JSON.parse(JSON.stringify(this.data));
    this.edit_mode = true;
  }

  exitEditMode(): void {
    this.edit_mode = false;
  }

  checkPendingChanges(): void {
    this.pending_changes =
      JSON.stringify(this.data) != JSON.stringify(this.data_edit);
  }

  saveData(): void {
    this.loading = true;
    this.httpService
      .put('/api/crm/table/' + this.table, this.data_edit)
      .subscribe(() => {
        this.data = JSON.parse(JSON.stringify(this.data_edit));
        this.exitEditMode();
        this.loading = false;
      });
  }

  deleteData(): void {
    if (window.confirm(`Are you sure you want to delete this ${this.table}?`)) {
      this.loading = true;
      this.httpService
        .delete('/api/crm/table/' + this.table + '/id/' + this.data.id)
        .subscribe(() => {
          window.location.href = '/crm/' + this.list_page;
        });
    }
  }

  getData(): void {
    this.data.id = window.location.pathname.split('/')[3];
    this.httpService
      .get('/api/crm/table/' + this.table + '/id/' + this.data.id)
      .subscribe((data: any) => {
        this.data = data;
        for (let column of this.columns) {
          if (this.data[column.field]) {
            this.exitEditMode();
            break;
          }
        }
        this.loading = false;
      });
  }
}
