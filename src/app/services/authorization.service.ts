import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const loginUrl: string = 'http://localhost:3000/auth/login';
const authToken: string = 'AuthSuperApp';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public isLogedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    if (this.cookieService.get(authToken)) {
      this.isLogedIn$.next(true);
    }
  }

  login(userName: string, userPass: string): Observable<any> {
    return this.http.post<any>(loginUrl, { userName, userPass }, { withCredentials: true }).pipe(
      tap(response => {
        this.isLogedIn$.next(true);
      }),
      catchError(err => {
        // process Error
        return throwError(err);
      })
    );
  }

  logout(): void {
    // NOTE: any sync with server on logoutz
    // TODO: fix it in the next PR
    this.cookieService.delete(authToken);
    this.isLogedIn$.next(false);
    this.router.navigate(['/']);
  }
}
