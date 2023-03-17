import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        } else {
          return of(null);
        }
      }),
      map((appUser: AppUser | null) => {
        return appUser ? appUser.isAdmin : false;
      })
    );
  }

}
