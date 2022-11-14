import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';

import { Company } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  providers: [HttpService],
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  loading: boolean = true;

  searchText: string = '';

  companies: { [id: string]: Company } = {};

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('/api/authentication/user').subscribe({
      next: () => {
        this.getCompanies();
      },
      error: () => {
        window.location.href = '/crm/login';
      },
    });
  }

  getCompanies(): void {
    this.httpService.get('/api/crm/companies').subscribe((data: any) => {
      for (let i in data) {
        this.companies[data[i].id] = data[i];
      }
      this.loading = false;
    });
  }

  addCompany(): void {
    this.loading = true;
    this.httpService.post('/api/crm/company', {}).subscribe((data: any) => {
      this.openCompany(data);
    });
  }

  openCompany(company_id: string): void {
    window.location.href = '/crm/company/' + company_id;
  }

  sortMethod = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
    const a_val = a.value.name.toLocaleLowerCase();
    const b_val = b.value.name.toLocaleLowerCase();
    if (a_val < b_val) return -1;
    if (a_val > b_val) return 1;
    return 0;
  };

  searchTextInRow(row: any): boolean {
    const searchText = this.searchText.trim().toLocaleLowerCase();
    if (!searchText) return true;
    if (row.name.toLocaleLowerCase().includes(searchText)) return true;
    return false;
  }
}
