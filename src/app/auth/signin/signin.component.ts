import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppParams } from 'src/app/app.params';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private appParams : AppParams,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.signInForm = this.formBuilder.group({
          login: ['', []],
          password: ['', []]
    })
  }

  onSubmit() {
    const login = this.signInForm.get("login").value;
    const password = this.signInForm.get("password").value;
    this.authService.signInUser(login, password).then(
      (authServiceResponse:any) => {
        this.appParams.setAuthServiceResponse(authServiceResponse);
        this.authService.isAuth = true;
        this.authService.login = login;
        this.router.navigate(["/users"]);
      }, (error) => {
        if (error.status==0) {
          this.errorMessage = "Pas de connexion au serveur !";
        } else this.errorMessage = error.error;
      }
    );
  }
}
