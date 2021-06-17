import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Reparation } from '../models/Reparation.model';

@Injectable({ providedIn: 'root' })

export class ReparationsService {

    private apiReparationsUrl = 'admin/reparations';  // URL to web api
    private apiReparationsEncoursUrl = 'admin/reparations/encours';  // URL to web api
    private apiReparationUrl = 'admin/reparation';  // URL to web api
    private apiNewReparationUrl = 'admin/reparation/new';  // URL to web api
    private apiUpdateReparationUrl = 'admin/reparation/update';  // URL to web api
    private apiDeleteReparationUrl = 'admin/reparation/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getReparationUrl(): string { return this.appParams.apiUrl + this.apiReparationUrl; }
    private getReparationsUrl(): string { return this.appParams.apiUrl + this.apiReparationsUrl; }
    private getReparationsEncousUrl(): string { return this.appParams.apiUrl + this.apiReparationsEncoursUrl; }
    private getNewReparationUrl(): string { return this.appParams.apiUrl + this.apiNewReparationUrl; }
    private getUpdateReparationUrl(): string { return this.appParams.apiUrl + this.apiUpdateReparationUrl; }
    private getDeleteReparationUrl(): string { return this.appParams.apiUrl + this.apiDeleteReparationUrl; }

    public getReparationById(id: number): Promise<Reparation> {
        const url = `${this.getReparationUrl()}/${id}`;
        return this.http.get<Reparation>(url, this.appParams.httpOptions).toPromise<Reparation>();
    }

    public getReparations(): Promise<Reparation[]> {
        const url = `${this.getReparationsUrl()}`;
        return this.http.get<Reparation[]>(url, this.appParams.httpOptions).toPromise<Reparation[]>();
    }
    public getReparationsEncours(): Promise<Reparation[]> {
        const url = `${this.getReparationsEncousUrl()}`;
        return this.http.get<Reparation[]>(url, this.appParams.httpOptions).toPromise<Reparation[]>();
    }

    public createNewReparation(newReparation: Reparation): Promise<Reparation> {
        const url = `${this.getNewReparationUrl()}`;
        return this.http.post<Reparation>(url, JSON.stringify(newReparation), this.appParams.httpOptions).toPromise<Reparation>();
    }
    public UpdateReparation(aReparation: Reparation): Promise<Reparation> {
        const url = `${this.getUpdateReparationUrl()}`;
        return this.http.post<Reparation>(url, JSON.stringify(aReparation), this.appParams.httpOptions).toPromise<Reparation>();
    }

    public removeReparation(reparation: Reparation): Promise<any> {
        const url = `${this.getDeleteReparationUrl()}/${reparation.id}`;
        return this.http.delete<Reparation[]>(url, this.appParams.httpOptions).toPromise<any>();

    }
}