import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../Model/person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  searchText: string = '';
  constructor(private personService: PersonService) { }

  ngOnInit(): void {

    this.personService.getAllPersons().subscribe((response: any) => {
      this.persons = response;
    });
  }

}
