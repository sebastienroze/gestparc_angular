import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Location } from '../models/Location.model';

@Injectable({ providedIn: 'root' })

export class LocationsService {
    private apiLocationsUrl = 'user/locations';  // URL to web api
    private apiLocationsEncoursUrl = 'user/locations/encours';  // URL to web api
    private apiLocationsEnPretUrl = 'admin/locationsEnPret';  // URL to web api
    private apiLocationUrl = 'user/location';  // URL to web api
    private apiNewLocationUrl = 'user/location/new';  // URL to web api
    private apiUpdateLocationUrl = 'user/location/update';  // URL to web api
    private apiDeleteLocationUrl = 'user/location/delete';  // URL to web api
    private apiUpdateAdminLocationUrl = 'admin/location/update';  // URL to web api
    private apiBordereauUrl = 'admin/location/borderau';  // URL to web api
    

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getLocationUrl(): string { return this.appParams.apiUrl + this.apiLocationUrl; }
    private getLocationsUrl(): string { return this.appParams.apiUrl + this.apiLocationsUrl; }
    private getLocationsEncoursUrl(): string { return this.appParams.apiUrl + this.apiLocationsEncoursUrl; }
    private getLocationsEnPretUrl(): string { return this.appParams.apiUrl + this.apiLocationsEnPretUrl; }
    private getNewLocationUrl(): string { return this.appParams.apiUrl + this.apiNewLocationUrl; }
    private getUpdateLocationUrl(): string { return this.appParams.apiUrl + this.apiUpdateLocationUrl; }
    private getUpdateAdminLocationUrl(): string { return this.appParams.apiUrl + this.apiUpdateAdminLocationUrl; }
    private getDeleteLocationUrl(): string { return this.appParams.apiUrl + this.apiDeleteLocationUrl; }
    private getBordereauUrl(): string { return this.appParams.apiUrl + this.apiBordereauUrl; }

    public getLocationById(id: number): Promise<Location> {
        const url = `${this.getLocationUrl()}/${id}`;
        return this.http.get<Location>(url, this.appParams.httpOptions).toPromise<Location>();
    }

    public getLocations(): Promise<Location[]> {
        const url = `${this.getLocationsUrl()}`;
        return this.http.get<Location[]>(url, this.appParams.httpOptions).toPromise<Location[]>();
    }

    public getLocationsEncours(): Promise<Location[]> {
        const url = `${this.getLocationsEncoursUrl()}`;
        return this.http.get<Location[]>(url, this.appParams.httpOptions).toPromise<Location[]>();
    }

    public OpenBordereau(id:number) {
        const url = `${this.getBordereauUrl()+id}`;        
//        return this.http.get<Byte[]>(url, this.appParams.httpOptions).toPromise<Location[]>();
    }

    public getLocationsEnPret(): Promise<Location[]> {
        const url = `${this.getLocationsEnPretUrl()}`;
        return this.http.get<Location[]>(url, this.appParams.httpOptions).toPromise<Location[]>();
    }

    public createNewLocation(newLocation: Location): Promise<Location> {
        const url = `${this.getNewLocationUrl()}`;
        return this.http.post<Location>(url, JSON.stringify(newLocation), this.appParams.httpOptions).toPromise<Location>();
    }
    public UpdateLocation(aLocation: Location): Promise<Location> {
        const url = `${this.getUpdateLocationUrl()}`;
        return this.http.post<Location>(url, JSON.stringify(aLocation), this.appParams.httpOptions).toPromise<Location>();
    }
    public UpdateAdminLocation(aLocation: Location): Promise<Location> {
        const url = `${this.getUpdateAdminLocationUrl()}`;
        return this.http.post<Location>(url, JSON.stringify(aLocation), this.appParams.httpOptions).toPromise<Location>();
    }
    public removeLocation(location: Location): Promise<any> {
        const url = `${this.getDeleteLocationUrl()}/${location.id}`;
        return this.http.delete<Location[]>(url, this.appParams.httpOptions).toPromise<any>();

    }

    public getEtatLocation(): string[] {
        return ["Demande", "Validé", "En pret", "Finalisée"];
    }   
}