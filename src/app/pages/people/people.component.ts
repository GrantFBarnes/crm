import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  columns: { [name: string]: string } = {
    'First Name': 'first_name',
    'Last Name': 'last_name',
  };

  constructor() {}

  ngOnInit(): void {}
}
