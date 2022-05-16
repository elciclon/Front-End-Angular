import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  url="http://localhost:4200/start-session";
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http:HttpClient) {
    console.log("AutenticationService is running");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'));
   }

   IniciarSesion(credenciales: any): Observable<any> {
     return this.http.post(this.url, credenciales).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
     }))
    }

    get UsuarioAutenticado()
    { 
      return this.currentUserSubject.value;
    }
    
}
