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

  removeTaskFromTasks(task: TableTask): void {
    for (let key in this.tasks) {
      this.tasks[key] = this.tasks[key].filter((t: TableTask) => {
        return t.id !== task.id;
      });
    }
  }

  addTaskToTasks(task: TableTask): void {
    const key = task.completed ? 'Completed' : 'Not Completed';
    if (!this.tasks[key]) this.tasks[key] = [];
    this.tasks[key].push(task);
  }

  toggleCompleted(task: any): void {
    this.loading = true;
    task.completed = task.completed ? 1 : 0;
    this.httpService.put('/api/crm/table/task', task).subscribe(() => {
      this.removeTaskFromTasks(task);
      this.addTaskToTasks(task);
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
        const date = datetime.getRepeatingISO(
          data[i].date,
          data[i].repeat_interval,
          data[i].repeat_count
        );
        if (!this.reminders[date]) this.reminders[date] = [];
        this.reminders[date].push(data[i]);
      }

      for (let date in this.reminders) {
        this.reminders[date] = this.reminders[date].sort(sort.sortByTime);
      }
    });
  }

  getTasks(): void {
    this.tasks = {};
    this.httpService.get('/api/crm/table/task').subscribe((data: any) => {
      for (let i in data) {
        this.addTaskToTasks(data[i]);
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
