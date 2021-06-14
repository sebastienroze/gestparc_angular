import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Historique } from '../models/Historique.model';

@Injectable({ providedIn: 'root' })

export class HistoriquesService {

    private apiHistoriquesUrl = 'admin/historiques';  // URL to web api
    private apiHistoriqueUrl = 'admin/historique';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getHistoriqueUrl(): string { return this.appParams.apiUrl + this.apiHistoriqueUrl; }
    private getHistoriquesUrl(): string { return this.appParams.apiUrl + this.apiHistoriquesUrl; }
    
    public getHistoriqueById(id: number): Promise<Historique> {
        const url = `${this.getHistoriqueUrl()}/${id}`;
        return this.http.get<Historique>(url, this.appParams.httpOptions).toPromise<Historique>();
    }

    public getHistoriques(idMateriel: number): Promise<Historique[]> {
        const url = `${this.getHistoriquesUrl()}/${idMateriel}`;
        return this.http.get<Historique[]>(url, this.appParams.httpOptions).toPromise<Historique[]>();
    }

}