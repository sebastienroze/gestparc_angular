import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppParams } from '../app.params';
import { Location } from '../models/Location.model';
import { AuthService } from '../services/auth.service';
import { LocationsService } from '../services/location.service';

@Component({
  selector: 'app-single-location',
  templateUrl: './single-location.component.html',
  styleUrls: ['./single-location.component.css']
})
export class SingleLocationComponent implements OnInit, OnDestroy {
  public location: Location = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private locationService: LocationsService,
    private router: Router,
    private authService: AuthService,
    public appParams : AppParams,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        this.locationService.getLocationById(routeParams.id).then(
          (location: Location) => {
            if (location === null) {
              console.log("Erreur à la lecture de la location " + routeParams.id);
              this.router.navigate(['/locations']);
            } else {
              this.location = location;
            }
          }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
        );
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getUtilisateurLogin(): string {
    if (this.location == null) return null
    if (this.location.utilisateur == null) return null
    return this.location.utilisateur.login
  }

  isOwner(): boolean {    
    if (this.getUtilisateurLogin() == null) {
      return true;
    }
    if (this.getUtilisateurLogin() == this.authService.login) {
      return true;
    }
    return false;
  }

  public canModify(): boolean {
    if (this.location == null) return false;    
    return (this.location.etat == 0) || (this.appParams.isAdmin() && (this.location.etat <= 1)) ;
  }

  public canDelete(): boolean {
    if (this.location == null) return false;
    if (!this.isOwner()) return false;
    return (this.location.etat == 0);
  }

  public getEtatLocation(): string {
    if (this.location != null) return this.locationService.getEtatLocation()[this.location.etat];
    return null;
  }

  getReference() {
    if ((this.location != null && this.location.materiel != null)) return this.location.materiel.reference;
    return null;
  }
  onBack() {
    this.router.navigate(['/locations']);
  }

  onNewLocation() {
    this.router.navigate(['/locations', 'new']);
  }

  onDeleteLocation() {
    this.locationService.removeLocation(this.location).then(
      (any: any) => {
        this.errorMessage = ""
        if (any === null) {
          console.log("Erreur à la suppression de la location" + this.location.id);
        } else {
          this.router.navigate(['/locations']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  onModify() {
    this.router.navigate(['/locations', 'edit', this.location.id]);
  }

  getCadreDescription() {
    if (this.location==null) return null
    if (this.location.cadre==null) return null
    return this.location.cadre.description
  }

  public canBordereau(): boolean {
    if (this.location == null) return false;
    return (this.location.etat > 1);
  }  

  onBordereau() {    
    this.appParams.visionneurFile = this.appParams.apiUrl 
    +  "docs/location/borderau/"+ this.location.id;
    this.appParams.visionneurBack = ['/locations','view',this.location.id+""]
    this.router.navigate(['/visionneur']);
  }
}
