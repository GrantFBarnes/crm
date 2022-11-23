import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

@Component({
  selector: 'app-page-detail-contact',
  templateUrl: './page-detail-contact.component.html',
  providers: [HttpService],
  styleUrls: ['./page-detail-contact.component.css'],
})
export class PageDetailContactComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';
  @Input() list_page: string = '';

  phone_columns: TableColumn[] = [{ field: 'value', title: 'Phone' }];
  email_columns: TableColumn[] = [{ field: 'value', title: 'Email' }];
  address_columns: TableColumn[] = [
    { field: 'city', title: 'City' },
    { field: 'state', title: 'State' },
    { field: 'zip', title: 'Zip' },
  ];
  note_columns: TableColumn[] = [{ field: 'details', title: 'Details' }];
  log_columns: TableColumn[] = [
    { field: 'details', title: 'Details' },
    { field: 'date', title: 'Date' },
    { field: 'time', title: 'Time' },
  ];
  job_columns: TableColumn[] = [
    { field: 'name', title: 'Job Position' },
    { field: 'company_id', title: 'Company' },
    { field: 'person_id', title: 'Person' },
  ];
  reminder_columns: TableColumn[] = [
    { field: 'reminder_id', title: 'Reminder' },
  ];
  task_columns: TableColumn[] = [{ field: 'task_id', title: 'Task' }];

  loading: boolean = true;

  edit_mode: boolean = false;
  data: any = {};
  data_edit: any = JSON.parse(JSON.stringify(this.data));
  pending_changes: boolean = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('/api/crm/user/authenticated').subscribe({
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
    this.pending_changes = false;
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
        this.data_edit = JSON.parse(JSON.stringify(this.data));
        this.data_edit.view_count += 1;
        this.saveData();
        if (!this.data.name) {
          this.enterEditMode();
        }
        this.loading = false;
      });
  }
}
