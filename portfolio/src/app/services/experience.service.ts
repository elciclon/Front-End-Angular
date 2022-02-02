import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs';
import { Experience } from '../Experience';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'http://localhost:5000/experience';
  
  constructor(private http:HttpClient) { }

  getExperience() {    
    return this.http.get(this.apiUrl);
  }
}
