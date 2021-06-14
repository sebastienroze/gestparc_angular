import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Alerte } from '../models/Alerte.model';

@Injectable({ providedIn: 'root' })

export class AlertesService {

    private apiAlertesUrl = 'admin/alertes';  // URL to web api
    public lastAlertes : Alerte[];

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getAlertesUrl(): string { return this.appParams.apiUrl + this.apiAlertesUrl; }


    public getAlertes(): Promise<Alerte[]> {
        const url = `${this.getAlertesUrl()}`;
        return this.http.get<Alerte[]>(url, this.appParams.httpOptions).toPromise<Alerte[]>();
    }

}