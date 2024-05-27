// definește serviciul AuthService, responsabil pentru gestionarea autentificării și înregistrării utilizatorilor.
// Utilizează HttpClient pentru a face cereri către API-ul de utilizatori și Observable din rxjs pentru gestionarea
// răspunsurilor asincrone.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${credentials.email}&password=${credentials.password}`).pipe(
      map(users => {
        if (users.length > 0) {
          return { success: true, user: users[0] }; // Assuming the first matched user is the correct one
        } else {
          throw new Error('No user found with these credentials');
        }
      })
    );
  }
  register(data: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }
}
