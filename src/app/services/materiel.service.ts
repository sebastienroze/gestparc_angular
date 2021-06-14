import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Materiel } from '../models/Materiel.model';
import { MaterielDetail } from "../models/MaterielDetail.model";

@Injectable({ providedIn: 'root' })

export class MaterielsService {

    private apiMaterielsUrl = 'admin/materiels';  // URL to web api
    private apiMaterielsForLocationUrl = 'admin/materielsForLocation/';  // URL to web api
    private apiMaterielUrl = 'user/materiel';  // URL to web api
    private apiMaterielDetailUrl = 'admin/materielDetail';  // URL to web api
    private apiNewMaterielUrl = 'admin/materiel/new';  // URL to web api
    private apiUpdateMaterielUrl = 'admin/materiel/update';  // URL to web api
    private apiDeleteMaterielUrl = 'admin/materiel/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getMaterielUrl(): string { return this.appParams.apiUrl + this.apiMaterielUrl; }
    private getMaterielDetailUrl(): string { return this.appParams.apiUrl + this.apiMaterielDetailUrl; }
    private getMaterielsUrl(): string { return this.appParams.apiUrl + this.apiMaterielsUrl; }
    private getMaterielsForLocationUrl(): string { return this.appParams.apiUrl + this.apiMaterielsForLocationUrl; }
    private getNewMaterielUrl(): string { return this.appParams.apiUrl + this.apiNewMaterielUrl; }
    private getUpdateMaterielUrl(): string { return this.appParams.apiUrl + this.apiUpdateMaterielUrl; }
    private getDeleteMaterielUrl(): string { return this.appParams.apiUrl + this.apiDeleteMaterielUrl; }

    public getMaterielById(id: number): Promise<Materiel> {
        const url = `${this.getMaterielUrl()}/${id}`;
        return this.http.get<Materiel>(url, this.appParams.httpOptions).toPromise<Materiel>();
    }
    
    public getMaterielDetailById(id: number): Promise<MaterielDetail> {
        const url = `${this.getMaterielDetailUrl()}/${id}`;
        return this.http.get<MaterielDetail>(url, this.appParams.httpOptions).toPromise<MaterielDetail>();
    }

    public getMateriels(): Promise<Materiel[]> {
        const url = `${this.getMaterielsUrl()}`;
        return this.http.get<Materiel[]>(url, this.appParams.httpOptions).toPromise<Materiel[]>();
    }

    public getMaterielsForLocation(idLocation: number): Promise<Materiel[]> {
        const url = `${this.getMaterielsForLocationUrl() + idLocation}`;
        return this.http.get<Materiel[]>(url, this.appParams.httpOptions).toPromise<Materiel[]>();
    }
    public createNewMateriel(newMateriel: Materiel): Promise<Materiel> {
        const url = `${this.getNewMaterielUrl()}`;
        return this.http.post<Materiel>(url, JSON.stringify(newMateriel), this.appParams.httpOptions).toPromise<Materiel>();
    }
    public UpdateMateriel(aMateriel: Materiel): Promise<Materiel> {
        const url = `${this.getUpdateMaterielUrl()}`;
        return this.http.post<Materiel>(url, JSON.stringify(aMateriel), this.appParams.httpOptions).toPromise<Materiel>();
    }

    public removeMateriel(aMateriel: Materiel): Promise<any> {
        const url = `${this.getDeleteMaterielUrl()}/${aMateriel.id}`;
        return this.http.delete<Materiel[]>(url, this.appParams.httpOptions).toPromise<any>();

    }
}