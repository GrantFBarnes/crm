import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';

import { TableReminder } from 'src/app/shared/interfaces/table-reminder';
import { TableTask } from 'src/app/shared/interfaces/table-task';
import { TableCompany } from 'src/app/shared/interfaces/table-company';
import { TablePerson } from 'src/app/shared/interfaces/table-person';

import * as datetime from 'src/app/shared/methods/datetime';
import * as sort from 'src/app/shared/methods/sort';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  providers: [HttpService],
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit {
  loading: boolean = true;

  reminders: { [date: string]: TableReminder[] } = {};

  tab: string = '';

  tasks: { [completion: string]: TableTask[] } = {};

  top_companies: TableCompany[] = [];
  recent_companies: TableCompany[] = [];

  top_people: TablePerson[] = [];
  recent_people: TablePerson[] = [];

  top_list: any[] = [];
  recent_list: any[] = [];
  tab_table: string = '';

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

  getAccordionHeaderClass(date: string): string {
    let classStr = 'accordion-button';
    const dateStr = this.getDateString(date);
    if (!dateStr.includes('Today')) classStr += ' collapsed';
    return classStr;
  }

  getAccordionBodyClass(date: string): string {
    let classStr = 'accordion-collapse collapse';
    const dateStr = this.getDateString(date);
    if (dateStr.includes('Today')) classStr += ' show';
    return classStr;
  }

  setTab(tab: string): void {
    this.tab = tab;

    switch (tab) {
      case 'Companies':
        this.top_list = JSON.parse(JSON.stringify(this.top_companies));
        this.recent_list = JSON.parse(JSON.stringify(this.recent_companies));
        this.tab_table = 'company';
        break;

      case 'People':
        this.top_list = JSON.parse(JSON.stringify(this.top_people));
        this.recent_list = JSON.parse(JSON.stringify(this.recent_people));
        this.tab_table = 'person';
        break;

      default:
        this.top_list = [];
        this.recent_list = [];
        this.tab_table = '';
        break;
    }
  }

  downloadFile(type: string, file_name: string, content: any): void {
    let typeKey = '';
    switch (type) {
      case 'excel':
        typeKey =
          'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        break;

      case 'csv':
        typeKey = 'data:text/csv;charset=utf-8,';
        break;

      case 'text':
        typeKey = 'data:text/json;charset=utf-8,';
        break;

      case 'pdf':
        typeKey = 'data:application/pdf;base64,';
        break;

      default:
        return;
    }

    const element = document.createElement('a');
    element.setAttribute('href', typeKey + encodeURIComponent(content));
    element.setAttribute('download', file_name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  downloadExcelReminders(date: string): void {
    this.httpService
      .get('/api/crm/excel/reminder/' + date)
      .subscribe((data: any) => {
        this.downloadFile('excel', 'crm_reminders_' + date + '.xlsx', data);
      });
  }

  downloadExcelTasks(): void {
    this.httpService.get('/api/crm/excel/task').subscribe((data: any) => {
      this.downloadFile('excel', 'crm_tasks.xlsx', data);
    });
  }

  downloadCSVExport(): void {
    this.httpService.get('/api/crm/csv/export').subscribe((data: any) => {
      this.downloadFile('csv', 'crm_export.csv', data);
    });
  }

  setReminderRepeatDate(row: any, refresh_reminders: boolean): void {
    if (refresh_reminders) this.loading = true;
    row.date = datetime.getReminderRepeatISO(row);
    this.httpService.put('/api/crm/table/reminder', row).subscribe(() => {
      if (refresh_reminders) {
        this.getReminders();
        this.loading = false;
      }
    });
  }

  toggleTaskCompleted(row: any): void {
    this.loading = true;
    row.completed = row.completed ? 1 : 0;
    this.httpService.put('/api/crm/table/task', row).subscribe(() => {
      this.getTasks();
      this.loading = false;
    });
  }

  getData(): void {
    this.getReminders();
    this.getTasks();
    this.getCompanies();
    this.getPeople();
    this.loading = false;
  }

  getReminders(): void {
    this.reminders = {};
    this.httpService.get('/api/crm/table/reminder').subscribe((data: any) => {
      for (let i in data) {
        const date = data[i].date;
        if (!this.reminders[date]) this.reminders[date] = [];
        this.reminders[date].push(data[i]);
      }

      for (let date in this.reminders) {
        this.reminders[date] = this.reminders[date].sort(sort.sortByTime);
      }

      this.setPastRemindersRepeatDate();
    });
  }

  setPastRemindersRepeatDate(): void {
    let past_reminders: TableReminder[] = [];
    const yesterday: Date = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    for (let d in this.reminders) {
      if (new Date(d) < yesterday) {
        for (let reminder of this.reminders[d]) {
          if (reminder.repeating) {
            past_reminders.push(reminder);
          }
        }
      }
    }

    if (past_reminders.length) {
      this.loading = true;
      for (let reminder of past_reminders) {
        this.setReminderRepeatDate(reminder, false);
      }
      this.getReminders();
      this.loading = false;
    }
  }

  getTasks(): void {
    this.tasks = {};
    this.httpService.get('/api/crm/table/task').subscribe((data: any) => {
      for (let i in data) {
        const completion = data[i].completed ? 'Completed' : 'Not Completed';
        if (!this.tasks[completion]) this.tasks[completion] = [];
        this.tasks[completion].push(data[i]);
      }

      for (let key in this.tasks) {
        this.tasks[key] = this.tasks[key].sort(sort.sortByName);
      }

      this.setTab('Tasks');
    });
  }

  getCompanies(): void {
    this.top_companies = [];
    this.recent_companies = [];
    this.httpService
      .get('/api/crm/table/company/top/view_count')
      .subscribe((count_data: any) => {
        this.top_companies = count_data.sort(sort.sortByViewCount);
        this.httpService
          .get('/api/crm/table/company/top/date_modified')
          .subscribe((date_data: any) => {
            this.recent_companies = date_data.sort(sort.sortByDateModified);
          });
      });
  }

  getPeople(): void {
    this.top_people = [];
    this.recent_people = [];
    this.httpService
      .get('/api/crm/table/person/top/view_count')
      .subscribe((count_data: any) => {
        this.top_people = count_data.sort(sort.sortByViewCount);
        this.httpService
          .get('/api/crm/table/person/top/date_modified')
          .subscribe((date_data: any) => {
            this.recent_people = date_data.sort(sort.sortByDateModified);
          });
      });
  }

  getDateString(iso: string): string {
    return datetime.getStringFromISO(iso);
  }

  getTimeString(time: string): string {
    return datetime.get12HourTime(time);
  }

  sortByKeyAsc = (a: KeyValue<any, any>, b: KeyValue<any, any>): number => {
    return sort.sortByKey(a, b);
  };

  sortByKeyDesc = (a: KeyValue<any, any>, b: KeyValue<any, any>): number => {
    return sort.sortByKey(b, a);
  };
}
