import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login';

  private httpClient = inject(HttpClient);
  private _token!: string;
  // {
  //   "sub": "matichelo17",
  //   "authorities": "[{\"authority\":\"ROLE_ADMIN\"}]",
  //   "username": "matichelo17",
  //   "iat": 1742065411,
  //   "exp": 1742069011
  // }  
  private _user: any = {
    authorities: '',
    username: '',
    iat: 0,
    exp: 0
  };

  constructor() { 
    // Inicializar los datos desde localStorage al momento de crear el servicio
    this.initFromLocalStorage();
  }
  
  private initFromLocalStorage(): void {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken) {
        this._token = storedToken;
      }
      
      if (storedUser) {
        this._user = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Error initializing from localStorage:', error);
      // En caso de error, limpiar el estado
      this.logout();
    }
  }

  loginUser(username: string, password: string) {
    return this.httpClient.post<any>(this.url, { username, password });
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem('token', this._token);
  }
  get token(): string {
    if (this._token) {
      return this._token;
    }
    
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this._token = storedToken;
      return this._token;
    }
    
    return '';  // Retornar cadena vacía en lugar de null/undefined
  }
  set user(user: any) {
    this._user = user;
    localStorage.setItem('user', JSON.stringify(this._user));
  }

  get user() {
    // verifica si es truthy (no null, no undefined, no 0, no false, no '')
    if (this._user) {
      return this._user;
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this._user = JSON.parse(storedUser);
    }
    return this._user;
  }

  isAdmin(): boolean {
    if (!this.user || !this.user.authorities) {
      return false;
    }
    const authorities = JSON.parse(this.user.authorities);
    return authorities?.[0]?.authority === 'ROLE_ADMIN';

  }

  isUser(): boolean {
    if (!this.user || !this.user.authorities) {
      return false;
    }
    const authorities = JSON.parse(this.user.authorities);
    return authorities?.[0]?.authority === 'ROLE_USER';
  }

  isAuthenticated(): boolean {
    return this.token != null && this.token !== '' && this.user != null && this.user.username && this.user.username !== '';
  }

  logout() {
    this._token = '';
    this._user = {
      authorities: '',
      username: '',
      iat: 0,
      exp: 0
    };
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
  }

}
