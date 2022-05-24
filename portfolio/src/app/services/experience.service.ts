import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'https://pacific-peak-82886.herokuapp.com/api/person/1';
  
  constructor(private http:HttpClient) { }

  getExperience() {    
    return this.http.get(this.apiUrl);
  }
}
