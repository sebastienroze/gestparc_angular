import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '../models/Location.model';
import { AuthService } from '../services/auth.service';
import { LocationsService } from '../services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, OnDestroy {
  public locations: Location[];
  public errorMessage: string;
  public idLocation = null;
  private routeSubscription: Subscription;
  public searchText: any;
  public searchEncours: any;
  /***********/
  constructor(
    private locationsService: LocationsService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,    
  ) { }
  /***********/


  ngOnInit(): void {
    this.searchEncours = false;
    this.recherche();
    this.searchEncours = true;
  }

    
  
  recherche() {
    var promiseLocation: Promise<Location[]>;
    if (!this.searchEncours) {
      promiseLocation = this.locationsService.getLocationsEncours();
    } else {
      promiseLocation= this.locationsService.getLocations();
    }
    promiseLocation.then(
      (locations: Location[]) => {
        if (locations === null) {
          console.log("Erreur à la lecture des locations");
        } else {
          this.locations = locations;
          this.errorMessage = ""; 
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );

    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idLocation = routeParams.id;
    });
  }

  public getEtatLocation(location: Location): string {
    if (location != null) return this.locationsService.getEtatLocation()[location.etat];
    return null;
  }

  public getReference(location: Location): string {
    if (location.materiel != null) return location.materiel.reference;
    return null;
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onViewLocation(id: number) {
    this.router.navigate(['/locations', 'view', id]);
  }


}
