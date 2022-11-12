import { Component, OnInit } from '@angular/core';
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

  openCompany(company_id: string): void {
    window.location.href = '/crm/company/' + company_id;
  }
}
