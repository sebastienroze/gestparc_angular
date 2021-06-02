import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { TypeMateriel } from '../models/TypeMateriel.model';

@Injectable({ providedIn: 'root' })

export class TypeMaterielsService {

    private apiTypeMaterielsUrl = 'user/typeMateriels';  // URL to web api
    private apiTypeMaterielUrl = 'user/typeMateriel';  // URL to web api
    private apiNewTypeMaterielUrl = 'admin/typeMateriel/new';  // URL to web api
    private apiUpdateTypeMaterielUrl = 'admin/typeMateriel/update';  // URL to web api
    private apiDeleteTypeMaterielUrl = 'admin/typeMateriel/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getTypeMaterielUrl(): string { return this.appParams.apiUrl + this.apiTypeMaterielUrl; }
    private getTypeMaterielsUrl(): string { return this.appParams.apiUrl + this.apiTypeMaterielsUrl; }
    private getNewTypeMaterielUrl(): string { return this.appParams.apiUrl + this.apiNewTypeMaterielUrl; }
    private getUpdateTypeMaterielUrl(): string { return this.appParams.apiUrl + this.apiUpdateTypeMaterielUrl; }
    private getDeleteTypeMaterielUrl(): string { return this.appParams.apiUrl + this.apiDeleteTypeMaterielUrl; }

    public getTypeMaterielById(id: number): Promise<TypeMateriel> {
        const url = `${this.getTypeMaterielUrl()}/${id}`;
        return this.http.get<TypeMateriel>(url, this.appParams.httpOptions).toPromise<TypeMateriel>();
    }

    public getTypeMateriels(): Promise<TypeMateriel[]> {
        const url = `${this.getTypeMaterielsUrl()}`;
        return this.http.get<TypeMateriel[]>(url, this.appParams.httpOptions).toPromise<TypeMateriel[]>();
    }

    public createNewTypeMateriel(newTypeMateriel: TypeMateriel): Promise<TypeMateriel> {
        const url = `${this.getNewTypeMaterielUrl()}`;
        return this.http.post<TypeMateriel>(url, JSON.stringify(newTypeMateriel), this.appParams.httpOptions).toPromise<TypeMateriel>();
    }
    public UpdateTypeMateriel(aTypeMateriel: TypeMateriel): Promise<TypeMateriel> {
        const url = `${this.getUpdateTypeMaterielUrl()}`;
        return this.http.post<TypeMateriel>(url, JSON.stringify(aTypeMateriel), this.appParams.httpOptions).toPromise<TypeMateriel>();
    }

    public removeTypeMateriel(user: TypeMateriel): Promise<any> {
        const url = `${this.getDeleteTypeMaterielUrl()}/${user.id}`;
        return this.http.delete<TypeMateriel[]>(url, this.appParams.httpOptions).toPromise<any>();

    }
}