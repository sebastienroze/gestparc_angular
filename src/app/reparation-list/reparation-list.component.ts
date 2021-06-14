import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Materiel } from '../models/Materiel.model';
import { Reparation } from '../models/Reparation.model';
import { AuthService } from '../services/auth.service';
import { ReparationsService } from '../services/reparation.service';

@Component({
  selector: 'app-reparation-list',
  templateUrl: './reparation-list.component.html',
  styleUrls: ['./reparation-list.component.css']
})
export class ReparationListComponent implements OnInit, OnDestroy {
  public reparations: Reparation[];
  public errorMessage: string;
  public idReparation = null;
  private routeSubscription: Subscription;
  public searchText: any;
  /***********/
  constructor(
    private reparationsService: ReparationsService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }
  /***********/

  ngOnInit(): void {
    this.reparationsService.getReparations().then(
      (reparations: Reparation[]) => {
        if (reparations === null) {
          console.log("Erreur à la lecture des reparations");
        } else {
          this.reparations = reparations;
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idReparation = routeParams.id;
    });

  }

  getReference(reparation: Reparation) {
    if (reparation==null) return null;
    if (reparation.materiel==null) return null;
    return reparation.materiel.reference;
  }
  
  getEtat(reparation: Reparation) {
    if (reparation==null) return null;
    if (reparation.materiel==null) return null;
    if (reparation.etat  == 0) return "En attente";
    return "Réparée";
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onViewReparation(id: number) {
    this.router.navigate(['/reparations', 'view', id]);
  }


}
