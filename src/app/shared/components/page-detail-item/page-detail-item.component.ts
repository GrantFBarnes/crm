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
      if (this.data.repeat_interval == 'day') {
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
        result = result.substring(0, result.length - 2);
      }

      if (!this.data.repeat_end) {
        result += ' forever';
      } else {
        if (result) result += '\nUntil ';
        if (this.data.repeat_end_date) {
          result += this.data.repeat_end_date;
        } else if (this.data.repeat_end_occurrences) {
          result += this.data.repeat_end_occurrences + ' occurrences';
        }
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
          this.data_edit.repeat_interval = 'day';
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
            !this.data_edit.repeat_weekly_friday
          ) {
            this.data_edit.repeat_weekly_monday = 1;
          }
        }

        if (this.data_edit.repeat_end) {
          if (!this.data_edit.repeat_end_type) {
            this.data_edit.repeat_end_type = 'date';
          }

          if (this.data_edit.repeat_end_type == 'date') {
            if (!this.data_edit.repeat_end_date) {
              this.data_edit.repeat_end_date = datetime.getNextMonthISO();
            }
          } else if (this.data_edit.repeat_end_type == 'occurrences') {
            if (!this.data_edit.repeat_end_occurrences) {
              this.data_edit.repeat_end_occurrences = 10;
            }
          }
        }
      }
    }
  }

  toggleCompleted(): void {
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
