import { Component, OnInit } from '@angular/core';
import { AppParams } from '../app.params';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  public version =0;
  isAuth : boolean;

  constructor(
    private appParams : AppParams,
    public authService: AuthService,    
  ) { }

  ngOnInit(): void {
    this.version = this.appParams.applicationVersion;
    this.isAuth = this.authService.isAuth;
  }
}
