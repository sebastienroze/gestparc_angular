import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppParams } from "../app.params";
import { User } from "../models/User.model";

@Injectable({providedIn:'root'})
export class AuthService {
    public login = "";
    public isAuth = false;
    private apiLoginUrl = 'authentication';  // URL to web api
    constructor(
        private http: HttpClient,
        private appParams : AppParams,
        private router: Router,
    ) {
        console.log("mode debug?");
        if (appParams.mode_debug == true) {
            console.log("mode debug");
            this.appParams.setAuthServiceResponse({
                bearer:"",
                roles:"['ROLE_ADMINISTRATEUR','ROLE_UTILISATEUR']",
            });
            this.isAuth = true;
            this.login = "mode_debug";                
        }
     }

    private getLoginUrl() : string {return this.appParams.apiUrl+this.apiLoginUrl; }

    public signInUser(login: string, password: string):Promise<any> {
        const url = `${this.getLoginUrl()}`;
        const user= new User(-1,login,password,null);
        return this.http.post<User>(url,JSON.stringify(user),this.appParams.httpOptions).toPromise()
    }

    public signOutUser() {
        this.isAuth = false;
        this.login = ""        
        this.appParams.doLogout();
    }

    public getErrorMessage(error:any) : string {
        if (error.status==0) {
            return "Pas de connexion au serveur !";
          } else if (error.status==403) {
              console.log("erreur authentification");
            this.router.navigate(['/auth','signin']);
          } else return error.error; 
    }    
}