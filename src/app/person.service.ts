import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Person } from './Model/person.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[] = [];
  url: string = environment.url;

  constructor(private http: HttpClient) { }

  addPerson(person: Person) {
    return this.http.post(`${this.url}/person`, person);
  }

  // Get all persons
  getAllPersons(){
    return this.http.get(`${this.url}/person`);
  }

  // Get person by ID
  getPersonById(id: number) {
    return this.http.get(`${this.url}/person/${id}`);
  }

  // Update person details
  updatePerson(id: string, person: Person) {
    return this.http.put(`${this.url}/person/${id}`, person);
  }

  // Delete person
  deletePerson(id: number) {
    
  }

  
  
}
