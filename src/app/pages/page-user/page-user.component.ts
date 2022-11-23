import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  providers: [HttpService],
  styleUrls: ['./page-user.component.css'],
})
export class PageUserComponent implements OnInit {
  loading: boolean = true;

  name: string = '';
  password: string = '';
  new_password: string = '';
  new_password_check: string = '';

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
      next: (data: any) => {
        this.name = data.name;
        this.loading = false;
      },
      error: () => {
        window.location.href = '/crm/login';
      },
    });
  }

  changePassword(): void {
    if (!this.new_password) return;
    if (this.new_password != this.new_password_check) return;

    this.loading = true;
    const body = { password: this.password, new_password: this.new_password };
    this.httpService.post('/api/crm/user/password', body).subscribe({
      next: () => {
        window.location.href = '/crm/home';
      },
      error: () => {
        this.loading = false;
        alert('Password Change Failed!');
      },
    });
  }
}
