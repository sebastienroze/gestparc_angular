import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppParams } from "../app.params";
import { Document } from '../models/Document.model';
import { Materiel } from "../models/Materiel.model";
import { Reparation } from "../models/Reparation.model";
import { Retour } from "../models/Retour.model";

@Injectable({ providedIn: 'root' })

export class DocumentsService {
    public materiel: Materiel;
    public reparation: Reparation;
    public retour : Retour;
    public routeDocument;
    
    private apiDocumentsUrl = 'admin/documents';  // URL to web api
    private apiDocumentsMaterielUrl = 'admin/documents/materiel';  // URL to web api
    private apiDocumentsReparationUrl = 'admin/documents/reparation';  // URL to web api
    private apiDocumentsRetourUrl = 'admin/documents/retour';  // URL to web api
    private apiDocumentUrl = 'admin/document';  // URL to web api
    private apiNewDocumentUrl = 'admin/document/new';  // URL to web api
    private apiUpdateDocumentUrl = 'admin/document/update';  // URL to web api
    private apiDeleteDocumentUrl = 'admin/document/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
        private router: Router,
    ) { }

    private getDocumentUrl(): string { return this.appParams.apiUrl + this.apiDocumentUrl; }
    private getDocumentsUrl(): string { return this.appParams.apiUrl + this.apiDocumentsUrl; }
    private getDocumentsMaterielUrl(): string { return this.appParams.apiUrl + this.apiDocumentsMaterielUrl; }
    private getDocumentsReparationUrl(): string { return this.appParams.apiUrl + this.apiDocumentsReparationUrl; }
    private getDocumentsRetourUrl(): string { return this.appParams.apiUrl + this.apiDocumentsRetourUrl; }
    private getNewDocumentUrl(): string { return this.appParams.apiUrl + this.apiNewDocumentUrl; }
    private getUpdateDocumentUrl(): string { return this.appParams.apiUrl + this.apiUpdateDocumentUrl; }
    private getDeleteDocumentUrl(): string { return this.appParams.apiUrl + this.apiDeleteDocumentUrl; }

    public getDocumentById(id: number): Promise<Document> {
        const url = `${this.getDocumentUrl()}/${id}`;
        return this.http.get<Document>(url, this.appParams.httpOptions).toPromise<Document>();
    }

    public getDocuments(): Promise<Document[]> {
        const url = `${this.getDocumentsUrl()}`;
        return this.http.get<Document[]>(url, this.appParams.httpOptions).toPromise<Document[]>();
    }

    public getDocumentsReparation(reparation : Reparation): Promise<Document[]> {
        const url = `${this.getDocumentsReparationUrl()}/${reparation.id}`;
        return this.http.get<Document[]>(url, this.appParams.httpOptions).toPromise<Document[]>();
    }

    public getDocumentsRetour(retour : Retour): Promise<Document[]> {
        const url = `${this.getDocumentsRetourUrl()}/${retour.id}`;
        return this.http.get<Document[]>(url, this.appParams.httpOptions).toPromise<Document[]>();
    }

    public getDocumentsMateriel(materiel : Materiel): Promise<Document[]> {
        const url = `${this.getDocumentsMaterielUrl()}/${materiel.id}`;
        return this.http.get<Document[]>(url, this.appParams.httpOptions).toPromise<Document[]>();
    }
    public createNewDocument(formData: FormData): Promise<any> {
        const url = `${this.getNewDocumentUrl()}`;
        return this.http.post(url, formData, this.appParams.httpOptionMultipart).toPromise();
    }
    public UpdateDocument2(aDocument: Document): Promise<Document> {
        const url = `${this.getUpdateDocumentUrl()}`;
        return this.http.post<Document>(url, JSON.stringify(aDocument), this.appParams.httpOptions).toPromise<Document>();
    }

    public removeDocument(document: Document): Promise<any> {
        const url = `${this.getDeleteDocumentUrl()}/${document.id}`;
        return this.http.delete<Document[]>(url, this.appParams.httpOptions).toPromise<any>();
    }

    public UpdateDocument(formData: FormData): Promise<any> {
        const url = `${this.getUpdateDocumentUrl()}`;
        return this.http.post(url, formData, this.appParams.httpOptionMultipart).toPromise();
    }

    public VoirDocuments(materiel : Materiel,reparation:Reparation,retour:Retour) {
           this.materiel=materiel;
           this.reparation=reparation;
           this.retour=retour;
           if (this.reparation!=null) {
            this.routeDocument = "/reparations"           
        }
        if (this.materiel!=null) {
            this.routeDocument = "/materiels"           
        }    
        if (this.retour!=null) {
            this.routeDocument = "/retours"           
        }    
        this.router.navigate([this.routeDocument,"documents"]);
    }
}