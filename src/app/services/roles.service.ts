import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Role } from "../models/Role.model";

@Injectable({providedIn:'root'})
export class RolesService  {
    private apiRolesUrl = 'admin/roles';  // URL to web api    
    private role: Role[] = [];
    constructor(
        private http: HttpClient,
        private appParams : AppParams,
    ) { }
    private getRolesUrl() : string {
        return this.appParams.apiUrl+this.apiRolesUrl;
    }
    public getRoles(): Promise<Role[]> {
        const url = `${this.getRolesUrl()}`;
        return this.http.get<Role[]>(url,this.appParams.httpOptions).toPromise<Role[]>();
    }
}
