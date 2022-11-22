import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';

import { Company } from 'src/app/shared/interfaces/company';
import { Person } from 'src/app/shared/interfaces/person';
import { Reminder } from 'src/app/shared/interfaces/reminder';
import { Task } from 'src/app/shared/interfaces/task';

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

  reminders: { [date: string]: Reminder[] } = {};

  tab: string = '';
  tab_list: any[] = [];
  tab_table: string = 'task';

  companies: Company[] = [];
  people: Person[] = [];
  tasks: Task[] = [];

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

  setTab(tab: string): void {
    this.tab = tab;

    switch (tab) {
      case 'Tasks':
        this.tab_list = JSON.parse(JSON.stringify(this.tasks));
        this.tab_table = 'task';
        break;

      case 'Companies':
        this.tab_list = JSON.parse(JSON.stringify(this.companies));
        this.tab_table = 'company';
        break;

      case 'People':
        this.tab_list = JSON.parse(JSON.stringify(this.people));
        this.tab_table = 'person';
        break;

      default:
        this.tab_list = [];
        this.tab_table = '';
        break;
    }
  }

  getData(): void {
    this.getReminders();
    this.getCompanies();
    this.getPeople();
    this.getTasks();
    this.loading = false;
  }

  getReminders(): void {
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

  getCompanies(): void {
    this.httpService.get('/api/crm/table/company').subscribe((data: any) => {
      this.companies = data.sort(sort.sortByName);
    });
  }

  getPeople(): void {
    this.httpService.get('/api/crm/table/person').subscribe((data: any) => {
      this.people = data.sort(sort.sortByName);
    });
  }

  getTasks(): void {
    this.httpService.get('/api/crm/table/task').subscribe((data: any) => {
      this.tasks = data.sort(sort.sortByName);
      this.setTab('Tasks');
    });
  }

  getDateString(iso: string): string {
    return datetime.getStringFromISO(iso);
  }

  getTimeString(time: string): string {
    return datetime.get12HourTime(time);
  }

  sortByDate = (a: KeyValue<any, any>, b: KeyValue<any, any>): number => {
    return sort.sortByKey(a, b);
  };
}
