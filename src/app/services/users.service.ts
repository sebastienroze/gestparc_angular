import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { User } from '../models/User.model';

@Injectable({providedIn:'root'})

export class UsersService  {
    private apiUsersUrl = 'admin/utilisateurs';  // URL to web api
    private apiUserUrl = 'admin/utilisateur';  // URL to web api
    private apiNewUserUrl = 'admin/utilisateur/new';  // URL to web api
    private apiUpdateUserUrl = 'admin/utilisateur/update';  // URL to web api
    private apiDeleteUserUrl = 'admin/utilisateur/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams : AppParams,
    ) { }

    private getUserUrl() : string {return this.appParams.apiUrl+this.apiUserUrl; }
    private getUsersUrl() : string {return this.appParams.apiUrl+this.apiUsersUrl;}
    private getNewUserUrl() : string {return this.appParams.apiUrl+this.apiNewUserUrl;}    
    private getUpdateUserUrl() : string {return this.appParams.apiUrl+this.apiUpdateUserUrl;}    
    private getDeleteUserUrl() : string {return this.appParams.apiUrl+this.apiDeleteUserUrl;}    

    public getUserById(id: number): Promise<User> {
        const url = `${this.getUserUrl()}/${id}`;
        return this.http.get<User>(url,this.appParams.httpOptions).toPromise<User>();
    }

    public getUsers(): Promise<User[]> {        
        const url = `${this.getUsersUrl()}`;
        return this.http.get<User[]>(url,this.appParams.httpOptions).toPromise<User[]>();
    }

    public createNewUser(newUser: User):Promise<User> {
        const url = `${this.getNewUserUrl()}`;
        return this.http.post<User>(url,JSON.stringify(newUser),this.appParams.httpOptions).toPromise<User>();
    }
    public UpdateUser(anUser: User):Promise<User> {
        const url = `${this.getUpdateUserUrl()}`;
        return this.http.post<User>(url,JSON.stringify(anUser),this.appParams.httpOptions).toPromise<User>();
    }
  
    public removeUser(user: User):Promise<any> {
        const url = `${this.getDeleteUserUrl()}/${user.id}`;
        return this.http.delete<User[]>(url,this.appParams.httpOptions).toPromise<any>();

    }
}