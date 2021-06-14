import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alerte } from '../models/Alerte.model';
import { Materiel } from '../models/Materiel.model';
import { AuthService } from '../services/auth.service';
import { AlertesService } from '../services/alerte.service';
import { MaterielsService } from '../services/materiel.service';
import { AppParams } from '../app.params';

@Component({
  selector: 'app-alerte-list',
  templateUrl: './alerte-list.component.html',
  styleUrls: ['./alerte-list.component.css']
})
export class AlerteListComponent implements OnInit, OnDestroy {
  public alertes: Alerte[];
  public idAlerte: number;
  public materiel: Materiel = null;
  public idmateriel: number;
  public errorMessage: string;
  private routeSubscription: Subscription;
  public searchText: any;

  /***********/
  constructor(
    private alertesService: AlertesService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private appParams: AppParams,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idAlerte = routeParams.id;
    });   
    this.routeSubscription = this.route.params.subscribe(routeParams => {    
      this.alertesService.getAlertes().then(
        (alertes: Alerte[]) => {
          if (alertes === null) {
            console.log("Erreur à la lecture des alertes");
          } else {
            this.alertes = alertes;
            this.alertesService.lastAlertes = alertes;
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }


  onViewAlerte(id: number) {
    this.router.navigate(['/alertes', 'view', id]);
  }


}
