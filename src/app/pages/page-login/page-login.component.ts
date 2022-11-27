import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  providers: [HttpService],
  styleUrls: ['./page-login.component.css'],
})
export class PageLoginComponent implements OnInit {
  loading: boolean = true;

  name: string = '';
  password: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // redirect to https if not localhost
    if (!window.origin.includes('local')) {
      if (location.protocol !== 'https:') {
        location.replace(
          'https:' + location.href.substring(location.protocol.length)
        );
      }
    }

    this.httpService.get('/api/crm/user/name').subscribe({
      next: () => {
        window.location.href = '/crm/home';
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  submit(): void {
    this.loading = true;
    const body = { name: this.name, password: this.password };
    this.httpService.post('/api/crm/user/login', body).subscribe({
      next: () => {
        window.location.href = '/crm/home';
      },
      error: () => {
        this.loading = false;
        alert('Login Failed!');
      },
    });
  }
}
