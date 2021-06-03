import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  onBack() {
    this.router.navigate(['/locations']);
  }

  onNewLocation() {
    this.router.navigate(['/locations', 'new']);
  }

  onDeleteLocation() {
    this.locationService.removeLocation(this.location).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression de lalocation" + this.location.id);
        } else {
          this.router.navigate(['/locations']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  onModify() {
    this.router.navigate(['/locations', 'edit', this.location.id]);
  }

}
