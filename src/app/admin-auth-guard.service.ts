import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.auth.appUser$.pipe(
      map((appUser: AppUser | null) => {
        return appUser ? appUser.isAdmin : false;
      })
    );
  }
}
