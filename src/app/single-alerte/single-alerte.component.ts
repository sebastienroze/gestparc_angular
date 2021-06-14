import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alerte } from '../models/Alerte.model';
import { AuthService } from '../services/auth.service';
import { AlertesService } from '../services/alerte.service';
import { LocationsService } from '../services/location.service';
import { Location } from '../models/Location.model';

@Component({
  selector: 'app-single-alerte',
  templateUrl: './single-alerte.component.html',
  styleUrls: ['./single-alerte.component.css']
})
export class SingleAlerteComponent implements OnInit, OnDestroy {
  public alerte: Alerte = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private alerteService: AlertesService,
    private router: Router,
    private locationService: LocationsService,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        if (this.alerteService.lastAlertes.length<routeParams.id) {
          console.log("Erreur à la lecture de l'alerte " + routeParams.id);
          this.router.navigate(['/alertes']);
        } else {
          this.alerte =  this.alerteService.lastAlertes[routeParams.id];
          console.log(this.alerte)
        } 
      }
    });
  }
  public getMateriel(): string {
    if (this.alerte == null) { return null;}
    if (this.alerte.location != null) {
      
       return null;
      }

  }

  public getEtatLocation(): string {
    if (this.alerte.location != null) {
      return this.locationService.getEtatLocation()[this.alerte.location.etat];
    }
    return null;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
