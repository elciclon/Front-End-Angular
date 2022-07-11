import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Education } from '../education';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiUrl = 'http://localhost:8080/api/person';

  constructor(private http: HttpClient) {}

  getAllEducations() {
    return this.http.get(this.apiUrl + '/1/educations');
  }

  updateEducation(education: Education): Observable<any> {
    return this.http.put(
      this.apiUrl + '/educations/' + education.id,
      education
    );
  }

  createEducation(education: Education): Observable<any> {
    return this.http.post(this.apiUrl + '/1/educations', education);
  }

  deleteEducation(educationId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/educations/' + educationId);
  }
}
