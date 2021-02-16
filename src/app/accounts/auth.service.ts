import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  public isAuthenticated() {
    return this.http.get('api/users/');
  }

  createUser(user: AuthData) {
    return this.http.post('api/users/register', user);
  }

  loginUser(user: AuthData) {
    return this.http.post('api/users/login', user);
  }

  getUser() {
    return this.http.get('api/users');
  }
}
