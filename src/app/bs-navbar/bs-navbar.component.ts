import { Component, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy {
  appUser: AppUser | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private auth: AuthService) {
    this.subscription = auth.appUser$.subscribe(appUser => {
      if (appUser) {
        this.appUser = appUser;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
