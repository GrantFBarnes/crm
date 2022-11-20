import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { Company } from 'src/app/shared/interfaces/company';
import { Person } from 'src/app/shared/interfaces/person';
import { Reminder } from 'src/app/shared/interfaces/reminder';
import { Task } from 'src/app/shared/interfaces/task';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  providers: [HttpService],
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit {
  loading: boolean = true;

  companies: Company[] = [];
  people: Person[] = [];
  reminders: Reminder[] = [];
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

  getData(): void {
    this.getCompanies();
    this.getPeople();
    this.getReminders();
    this.getTasks();
    this.loading = false;
  }

  getCompanies(): void {
    this.httpService.get('/api/crm/table/company').subscribe((data: any) => {
      this.companies = data.sort(this.sortMethod);
    });
  }

  getPeople(): void {
    this.httpService.get('/api/crm/table/person').subscribe((data: any) => {
      this.people = data.sort(this.sortMethod);
    });
  }

  getReminders(): void {
    this.httpService.get('/api/crm/table/reminder').subscribe((data: any) => {
      this.reminders = data.sort(this.sortMethod);
    });
  }

  getTasks(): void {
    this.httpService.get('/api/crm/table/task').subscribe((data: any) => {
      this.tasks = data.sort(this.sortMethod);
    });
  }

  sortMethod = (a: any, b: any): number => {
    const a_val = a.name.toLocaleLowerCase();
    const b_val = b.name.toLocaleLowerCase();
    if (a_val < b_val) return -1;
    if (a_val > b_val) return 1;
    return 0;
  };
}
