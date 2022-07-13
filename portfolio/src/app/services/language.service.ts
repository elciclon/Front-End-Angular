import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private apiUrl =
    'https://portfolio-adrianfernandezfazio.herokuapp.com/api/person';
  constructor(private http: HttpClient) {}

  getAllLanguages() {
    return this.http.get(this.apiUrl + '/1/languages');
  }

  updateLanguage(language: Language): Observable<any> {
    return this.http.put(this.apiUrl + '/languages/' + language.id, language);
  }

  createLanguage(language: Language): Observable<any> {
    return this.http.post(this.apiUrl + '/1/languages', language);
  }

  deleteLanguage(languageId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/languages/' + languageId);
  }
}
