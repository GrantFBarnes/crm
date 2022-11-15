import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  columns: { [name: string]: string } = { Name: 'name' };

  constructor() {}

  ngOnInit(): void {}
}
