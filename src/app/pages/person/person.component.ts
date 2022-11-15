import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  columns: { [name: string]: string } = {
    'First Name': 'first_name',
    'Last Name': 'last_name',
  };

  constructor() {}

  ngOnInit(): void {}
}
