import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = 'https://portfolio-adrianfernandezfazio.herokuapp.com/auth/';
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    console.log('AutenticationService is running');
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }

  public logIn(userLogin: UserLogin): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.url + 'login', userLogin);
  }

  get userAuthenticated() {
    return this.currentUserSubject.value;
  }
}
