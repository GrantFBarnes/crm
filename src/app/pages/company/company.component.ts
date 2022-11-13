import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { Company } from 'src/app/shared/interfaces/company';
import { Address } from 'src/app/shared/interfaces/address';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  providers: [HttpService],
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  loading: boolean = true;

  editMode: boolean = false;

  company: Company = { id: '', user_id: '', name: '' };
  company_edit: Company = JSON.parse(JSON.stringify(this.company));

  addresses: Address[] = [];
  phones: string[] = [];
  emails: string[] = [];
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

  enterEditMode(): void {
    this.company_edit = JSON.parse(JSON.stringify(this.company));
    this.editMode = true;
  }

  exitEditMode(): void {
    this.editMode = false;
  }

  saveChanges(): void {
    this.loading = true;
    this.httpService
      .put('/api/crm/company', this.company_edit)
      .subscribe(() => {
        this.company = JSON.parse(JSON.stringify(this.company_edit));
        this.exitEditMode();
        this.loading = false;
      });
  }

  getCompany(): void {
    this.company.id = window.location.pathname.split('/')[3];
    this.httpService
      .get('/api/crm/company/' + this.company.id)
      .subscribe((data: any) => {
        this.company = data;
        this.getCompanyAddresses();
        this.getCompanyPhones();
        this.getCompanyEmails();
        this.getCompanyNotes();
        this.loading = false;
      });
  }

  getCompanyAddresses(): void {}
  getCompanyPhones(): void {}
  getCompanyEmails(): void {}
  getCompanyNotes(): void {}
}
