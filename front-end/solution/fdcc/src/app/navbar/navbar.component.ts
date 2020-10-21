import { Component, OnInit } from '@angular/core';
import {AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
    private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
