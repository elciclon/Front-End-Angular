import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/Person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'https://pacific-peak-82886.herokuapp.com/api/person/1';
  constructor(private http:HttpClient) { }

  getPerson() {
    return this.http.get(this.apiUrl)
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.apiUrl, person);
    alert('Guardar persona se está ejecutando');
  }

}
