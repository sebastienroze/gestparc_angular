import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Retour } from '../models/Retour.model';

@Injectable({ providedIn: 'root' })

export class RetoursService {

    private apiRetoursUrl = 'admin/retours';  // URL to web api
    private apiRetourUrl = 'admin/retour';  // URL to web api
    private apiNewRetourUrl = 'admin/retour/new';  // URL to web api
    private apiUpdateRetourUrl = 'admin/retour/update';  // URL to web api
    private apiDeleteRetourUrl = 'admin/retour/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getRetourUrl(): string { return this.appParams.apiUrl + this.apiRetourUrl; }
    private getRetoursUrl(): string { return this.appParams.apiUrl + this.apiRetoursUrl; }
    private getNewRetourUrl(): string { return this.appParams.apiUrl + this.apiNewRetourUrl; }
    private getUpdateRetourUrl(): string { return this.appParams.apiUrl + this.apiUpdateRetourUrl; }
    private getDeleteRetourUrl(): string { return this.appParams.apiUrl + this.apiDeleteRetourUrl; }

    public getRetourById(id: number): Promise<Retour> {
        const url = `${this.getRetourUrl()}/${id}`;
        return this.http.get<Retour>(url, this.appParams.httpOptions).toPromise<Retour>();
    }

    public getRetours(): Promise<Retour[]> {
        const url = `${this.getRetoursUrl()}`;
        return this.http.get<Retour[]>(url, this.appParams.httpOptions).toPromise<Retour[]>();
    }

    public createNewRetour(newRetour: Retour): Promise<Retour> {
        const url = `${this.getNewRetourUrl()}`;
        return this.http.post<Retour>(url, JSON.stringify(newRetour), this.appParams.httpOptions).toPromise<Retour>();
    }
    public UpdateRetour(aRetour: Retour): Promise<Retour> {
        const url = `${this.getUpdateRetourUrl()}`;
        return this.http.post<Retour>(url, JSON.stringify(aRetour), this.appParams.httpOptions).toPromise<Retour>();
    }

    public removeRetour(retour: Retour): Promise<any> {
        const url = `${this.getDeleteRetourUrl()}/${retour.id}`;
        return this.http.delete<Retour[]>(url, this.appParams.httpOptions).toPromise<any>();

    }
}