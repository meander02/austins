import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'http://tu-api.com'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  signUpAndVerifyEmail(data: any): Observable<any> {
    const url = `${environment.api}/auth/sign-up-and-verify-email`;
    return this.http.post(url, data);
  }

  signIn(data: any): Observable<any> {
    const url = `${environment.api}/auth/sign-in`;
    return this.http.post(url, data);
  }

  verifyEmail(token: string): Observable<any> {
    const url = `${environment.api}/auth/verify/${token}`;
    return this.http.get(url);
  }
}
