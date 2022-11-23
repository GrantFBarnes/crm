import { Component } from '@angular/core';

import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [HttpService],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user_name: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    const is_login_page = window.location.pathname == '/crm/login';

    this.httpService.get('/api/crm/user/name').subscribe({
      next: (data: any) => {
        this.user_name = data.name;
        if (is_login_page) {
          window.location.href = '/crm/home';
        }
      },
      error: () => {
        if (!is_login_page) {
          window.location.href = '/crm/login';
        }
      },
    });
  }

  logout(): void {
    this.httpService.post('/api/crm/user/logout', {}).subscribe(() => {
      window.location.href = '/crm/login';
    });
  }
}
