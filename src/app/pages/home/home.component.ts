import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HttpService],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
