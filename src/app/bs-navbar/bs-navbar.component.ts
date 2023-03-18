import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from './../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser | null = null;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => {
      if (appUser) {
        this.appUser = appUser;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
