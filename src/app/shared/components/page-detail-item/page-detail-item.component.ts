import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableColumn } from 'src/app/shared/interfaces/table-column';

import * as datetime from 'src/app/shared/methods/datetime';

@Component({
  selector: 'app-page-detail-item',
  templateUrl: './page-detail-item.component.html',
  providers: [HttpService],
  styleUrls: ['./page-detail-item.component.css'],
})
export class PageDetailItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() table: string = '';
  @Input() list_page: string = '';

  loading: boolean = true;

  edit_mode: boolean = false;
  data: any = {};
  data_edit: any = JSON.parse(JSON.stringify(this.data));
  pending_changes: boolean = false;

  list_columns: TableColumn[] = [{ field: 'list_id', title: 'List' }];
  company_columns: TableColumn[] = [{ field: 'company_id', title: 'Company' }];
  person_columns: TableColumn[] = [{ field: 'person_id', title: 'Person' }];

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

  getDateTimeString(): string {
    let result = '';

    if (this.data.date) {
      result += this.data.date;
    }

    if (this.data.time) {
      if (result) result += ', ';
      result += datetime.get12HourTime(this.data.time);
    }

    if (this.data.repeating) {
      if (result) result += '\n';
      result += this.title + ' will repeat every ';
      if (this.data.repeat_interval == 'work_day') {
        result += 'work day';
      } else if (this.data.repeat_interval == 'day') {
        result += 'day';
      } else {
        result += this.data.repeat_weekly_gap + ' ' + this.data.repeat_interval;
        if (this.data.repeat_weekly_gap > 1) {
          result += 's';
        }
        result += ' on ';
        if (this.data.repeat_weekly_monday) result += 'Monday, ';
        if (this.data.repeat_weekly_tuesday) result += 'Tuesday, ';
        if (this.data.repeat_weekly_wednesday) result += 'Wednesday, ';
        if (this.data.repeat_weekly_thursday) result += 'Thursday, ';
        if (this.data.repeat_weekly_friday) result += 'Friday, ';
        if (this.data.repeat_weekly_saturday) result += 'Saturday, ';
        if (this.data.repeat_weekly_sunday) result += 'Sunday, ';
        result = result.substring(0, result.length - 2);
      }
    }

    return result;
  }

  setDefaults(): void {
    for (let f in this.data_edit) {
      if (typeof this.data_edit[f] == 'boolean') {
        this.data_edit[f] = this.data_edit[f] ? 1 : 0;
      }
    }

    if (this.table == 'reminder') {
      if (!this.data_edit.date) {
        this.data_edit.date = datetime.getTodayISO();
      }

      if (this.data_edit.repeating) {
        if (!this.data_edit.repeat_interval) {
          this.data_edit.repeat_interval = 'work_day';
        }

        if (this.data_edit.repeat_interval == 'week') {
          if (!this.data_edit.repeat_weekly_gap) {
            this.data_edit.repeat_weekly_gap = 1;
          }

          if (this.data_edit.repeat_weekly_gap < 1) {
            this.data_edit.repeat_weekly_gap = 1;
          } else if (this.data_edit.repeat_weekly_gap > 127) {
            this.data_edit.repeat_weekly_gap = 127;
          }

          if (
            !this.data_edit.repeat_weekly_monday &&
            !this.data_edit.repeat_weekly_tuesday &&
            !this.data_edit.repeat_weekly_wednesday &&
            !this.data_edit.repeat_weekly_thursday &&
            !this.data_edit.repeat_weekly_friday &&
            !this.data_edit.repeat_weekly_saturday &&
            !this.data_edit.repeat_weekly_sunday
          ) {
            this.data_edit.repeat_weekly_monday = 1;
          }
        }
      }
    }
  }

  toggleTaskCompleted(): void {
    if (this.edit_mode) {
      this.checkPendingChanges();
    } else {
      this.saveData();
    }
  }

  checkPendingChanges(): void {
    this.setDefaults();
    this.pending_changes =
      JSON.stringify(this.data) != JSON.stringify(this.data_edit);
  }

  saveData(): void {
    this.loading = true;
    this.httpService
      .put('/api/crm/table/' + this.table, this.data_edit)
      .subscribe(() => {
        this.data = JSON.parse(JSON.stringify(this.data_edit));
        if (this.data.name) {
          this.exitEditMode();
        } else {
          this.enterEditMode();
        }
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
        if (!this.data.name) {
          this.enterEditMode();
        }
        this.loading = false;
      });
  }
}
