import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppParams } from "../app.params";
import { Location } from '../models/Location.model';

@Injectable({ providedIn: 'root' })

export class LocationsService {

    private apiLocationsUrl = 'user/locations';  // URL to web api
    private apiLocationUrl = 'user/location';  // URL to web api
    private apiNewLocationUrl = 'user/location/new';  // URL to web api
    private apiUpdateLocationUrl = 'user/location/update';  // URL to web api
    private apiDeleteLocationUrl = 'user/location/delete';  // URL to web api

    constructor(
        private http: HttpClient,
        private appParams: AppParams,
    ) { }

    private getLocationUrl(): string { return this.appParams.apiUrl + this.apiLocationUrl; }
    private getLocationsUrl(): string { return this.appParams.apiUrl + this.apiLocationsUrl; }
    private getNewLocationUrl(): string { return this.appParams.apiUrl + this.apiNewLocationUrl; }
    private getUpdateLocationUrl(): string { return this.appParams.apiUrl + this.apiUpdateLocationUrl; }
    private getDeleteLocationUrl(): string { return this.appParams.apiUrl + this.apiDeleteLocationUrl; }

    public getLocationById(id: number): Promise<Location> {
        const url = `${this.getLocationUrl()}/${id}`;
        return this.http.get<Location>(url, this.appParams.httpOptions).toPromise<Location>();
    }

    public getLocations(): Promise<Location[]> {
        const url = `${this.getLocationsUrl()}`;
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

    public removeLocation(user: Location): Promise<any> {
        const url = `${this.getDeleteLocationUrl()}/${user.id}`;
        return this.http.delete<Location[]>(url, this.appParams.httpOptions).toPromise<any>();

    }
}