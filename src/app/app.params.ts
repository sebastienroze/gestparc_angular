import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })

export class AppParams {
  mode_debug: boolean = true;
  applicationVersion = 0.001;
//  apiUrl: string = 'http://146.59.199.18:8080/gestparc/';
  apiUrl: string = 'http://localhost:8080/';

  private roles: string[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public setAuthServiceResponse(authServiceResponse: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        , 'Authorization': `Bearer ${authServiceResponse.bearer}`
      })
    };
    this.roles = eval(authServiceResponse.roles);
  }
  public doLogout() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.roles = [];
  }

  public isAdmin() {
    return this.roles.includes("ROLE_ADMINISTRATEUR")
  }
  public isUser() {
    return this.roles.includes("ROLE_UTILISATEUR")
  }

}