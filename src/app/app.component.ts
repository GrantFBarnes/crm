import { Component } from '@angular/core';

import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [HttpService],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLogout: boolean = true;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    if (window.location.pathname == '/crm/login') {
      this.showLogout = false;
    }
  }

  logout(): void {
    this.httpService.post('/api/crm/logout', {}).subscribe(() => {
      window.location.href = '/crm/login';
    });
  }
}
