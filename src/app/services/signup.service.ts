import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, finalize, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserForm, UserAPI, UserSaved } from '../types/user.types';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private httpClient: HttpClient) {}

  public savedUser$ = new Subject<UserSaved>();
  public loading$ = new Subject<boolean>();

  public signupUser(user: UserForm): Observable<UserSaved> {
    this.setLoadingState(true);
    
    return this.httpClient.post<UserAPI>(environment.apiUrl, user).pipe(
      map((user) => this.mapUserAPItoUserSaved(user)),
      catchError(this.handleError),
      finalize(() => this.setLoadingState(false)),
    );
  }

  private mapUserAPItoUserSaved(user: UserAPI): UserSaved {
    return {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
    };
  }

  private setLoadingState(loading: boolean) {
    this.loading$.next(loading)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
