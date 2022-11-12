import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { Company } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  providers: [HttpService],
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  loading: boolean = true;
  company: Company = { id: '', name: '', city: '', state: '', zip: '' };

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('/api/authentication/user').subscribe({
      next: () => {
        this.getCompany();
      },
      error: () => {
        window.location.href = '/crm/login';
      },
    });
  }

  getCompany(): void {
    this.company.id = window.location.pathname.split('/')[3];
    this.httpService
      .get('/api/crm/company/' + this.company.id)
      .subscribe((data: any) => {
        this.company.name = data.name;
        this.company.city = data.city;
        this.company.state = data.state;
        this.company.zip = data.zip;
        this.loading = false;
      });
  }
}
