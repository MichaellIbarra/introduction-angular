import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = []
  private url: string = 'http://localhost:8080/api/users';

  private httpclient = inject(HttpClient);

  constructor() { }

  // Observable es una clase que permite la comunicación entre componentes y servicios para compartir información
  getUsers(): Observable<User[]>{
    // of() es una función que permite retornar un observable
    // return of(this.users);
    return this.httpclient.get<User[]>(this.url);
  }

  getUsersPage(page:number): Observable<any> {
    return this.httpclient.get<any>(`${this.url}/pageable/${page}`);
  }

  findById(id:number): Observable<User> {
    return this.httpclient.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.httpclient.post<User>(this.url, user);
  }

  update(user: User): Observable<User> {
    return this.httpclient.put<User>(`${this.url}/${user.id}`, user);
  }

  remove(id:number): Observable<User> {
    return this.httpclient.delete<User>(`${this.url}/${id}`);
  }

}
