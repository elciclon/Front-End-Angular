import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = 'https://pacific-peak-82886.herokuapp.com/api/person/1';
  constructor(private http:HttpClient) { }

  getPerson() {
    return this.http.get(this.apiUrl)
  }

}
