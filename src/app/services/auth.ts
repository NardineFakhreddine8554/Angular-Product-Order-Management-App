import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:3000'; // json-server endpoint
  user = signal<any>(null);


  constructor(private http: HttpClient,private router: Router) {

    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    }
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.API}/users`, payload);
  }

  login(payload: { email: string; password: string }) {
    // If using json-server
    return this.http.get<any[]>(`${this.API}/users?email=${encodeURIComponent(payload.email)}`)
      .pipe(
        map(users => {
          const user = users.find(u => u.password === payload.password);
          if (!user) throw { message: 'Invalid credentials' };
          this.user.set(user);
         
            localStorage.setItem('authUser', JSON.stringify(user));
          
         
          return user;
        })
      );
  }

   logout() {
    this.user.set(null);

    localStorage.removeItem('authUser');
    
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!(this.user() || localStorage.getItem('authUser'));
  }
  
}
