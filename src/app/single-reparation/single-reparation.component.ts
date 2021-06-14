import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reparation } from '../models/Reparation.model';
import { AuthService } from '../services/auth.service';
import { ReparationsService } from '../services/reparation.service';

@Component({
  selector: 'app-single-reparation',
  templateUrl: './single-reparation.component.html',
  styleUrls: ['./single-reparation.component.css']
})
export class SingleReparationComponent implements OnInit, OnDestroy {
  public reparation: Reparation = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private reparationService: ReparationsService,
    private router: Router,
    private authService: AuthService,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        this.reparationService.getReparationById(routeParams.id).then(
          (reparation: Reparation) => {
            if (reparation === null) {
              console.log("Erreur à la lecture du reparation " + routeParams.id);
              this.router.navigate(['/reparations']);
            } else {
              this.reparation = reparation;
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
    this.router.navigate(['/reparations']);
  }

  onNewReparation() {
    this.router.navigate(['/reparations', 'new']);
  }

  onDeleteReparation() {
    this.reparationService.removeReparation(this.reparation).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression du reparation" + this.reparation.id);
        } else {
          this.router.navigate(['/reparations']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  getReference() {
    if (this.reparation==null) return null;
    if (this.reparation.materiel==null) return null;
    return this.reparation.materiel.reference;
  }

  onModify() {
    this.router.navigate(['/reparations', 'edit', this.reparation.id]);
  }

}
