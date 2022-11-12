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
  contactInfo: { [type: string]: string[] } = {};
  notes: string[] = [];

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
        this.getCompanyContactInfo();
        this.getCompanyNotes();
        this.loading = false;
      });
  }

  getCompanyContactInfo(): void {
    this.httpService
      .get('/api/crm/company/' + this.company.id + '/contact')
      .subscribe((data: any) => {
        for (let i in data) {
          if (!this.contactInfo[data[i].type]) {
            this.contactInfo[data[i].type] = [];
          }
          this.contactInfo[data[i].type].push(data[i].value);
        }
      });
  }

  getCompanyNotes(): void {
    this.httpService
      .get('/api/crm/company/' + this.company.id + '/notes')
      .subscribe((data: any) => {
        for (let i in data) {
          this.notes.push(data[i].note);
        }
      });
  }
}
