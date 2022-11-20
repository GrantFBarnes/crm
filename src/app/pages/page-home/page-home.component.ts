import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  providers: [HttpService],
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit {
  loading: boolean = true;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('/api/authentication/user').subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        window.location.href = '/crm/login';
      },
    });
  }
}
