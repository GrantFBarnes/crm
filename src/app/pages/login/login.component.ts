import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [HttpService],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = true;

  username: string = '';
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

    this.httpService.get('/api/authentication/user').subscribe({
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
    const body = { username: this.username, password: this.password };
    this.httpService.post('/api/crm/login', body).subscribe({
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
