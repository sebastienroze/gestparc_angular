import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Cadre } from '../models/Cadre.model';

@Injectable({ providedIn: 'root' })

export class CadresService {

    private apiCadresUrl = 'user/cadres';  // URL to web api
    private apiCadreUrl = 'user/cadre';  // URL to web api
    private apiNewCadreUrl = 'admin/cadre/new';  // URL to web api
    private apiUpdateCadreUrl = 'admin/cadre/update';  // URL to web api
    private apiDeleteCadreUrl = 'admin/cadre/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getCadreUrl(): string { return this.appParams.apiUrl + this.apiCadreUrl; }
    private getCadresUrl(): string { return this.appParams.apiUrl + this.apiCadresUrl; }
    private getNewCadreUrl(): string { return this.appParams.apiUrl + this.apiNewCadreUrl; }
    private getUpdateCadreUrl(): string { return this.appParams.apiUrl + this.apiUpdateCadreUrl; }
    private getDeleteCadreUrl(): string { return this.appParams.apiUrl + this.apiDeleteCadreUrl; }

    public getCadreById(id: number): Promise<Cadre> {
        const url = `${this.getCadreUrl()}/${id}`;
        return this.http.get<Cadre>(url, this.appParams.httpOptions).toPromise<Cadre>();
    }

    public getCadres(): Promise<Cadre[]> {
        const url = `${this.getCadresUrl()}`;
        return this.http.get<Cadre[]>(url, this.appParams.httpOptions).toPromise<Cadre[]>();
    }

    public createNewCadre(newCadre: Cadre): Promise<Cadre> {
        const url = `${this.getNewCadreUrl()}`;
        return this.http.post<Cadre>(url, JSON.stringify(newCadre), this.appParams.httpOptions).toPromise<Cadre>();
    }
    public UpdateCadre(aCadre: Cadre): Promise<Cadre> {
        const url = `${this.getUpdateCadreUrl()}`;
        return this.http.post<Cadre>(url, JSON.stringify(aCadre), this.appParams.httpOptions).toPromise<Cadre>();
    }

    public removeCadre(user: Cadre): Promise<any> {
        const url = `${this.getDeleteCadreUrl()}/${user.id}`;
        return this.http.delete<Cadre[]>(url, this.appParams.httpOptions).toPromise<any>();

    }
}