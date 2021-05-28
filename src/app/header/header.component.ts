import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppParams } from '../app.params';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth : boolean;

  constructor(public authService: AuthService,
            public appParams : AppParams,
            private router: Router) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth;
    console.log(this.router.url);
  }
  
  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(["auth","signin"]);
  }
}
