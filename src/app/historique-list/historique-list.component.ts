import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Historique } from '../models/Historique.model';
import { Materiel } from '../models/Materiel.model';
import { AuthService } from '../services/auth.service';
import { HistoriquesService } from '../services/historique.service';
import { MaterielsService } from '../services/materiel.service';

@Component({
  selector: 'app-historique-list',
  templateUrl: './historique-list.component.html',
  styleUrls: ['./historique-list.component.css']
})
export class HistoriqueListComponent implements OnInit, OnDestroy {
  public historiques: Historique[];
  public idHistorique: number;
  public materiel: Materiel = null;
  public idmateriel: number;
  public errorMessage: string;
  private routeSubscription: Subscription;
  public searchText: any;

  /***********/
  constructor(
    private historiquesService: HistoriquesService,
    private router: Router,
    private authService: AuthService,
    private materielService: MaterielsService,
    private route: ActivatedRoute,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.materielService.getMaterielById(routeParams.id).then(
        (materiel: Materiel) => {
          if (materiel === null) {
            console.log("Erreur à la lecture du materiel" + routeParams.id);
            this.router.navigate(['/materiels']);
          } else {
            this.materiel = materiel;
            this.idmateriel =materiel.id ;
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );      
      this.historiquesService.getHistoriques(routeParams.id).then(
        (historiques: Historique[]) => {
          if (historiques === null) {
            console.log("Erreur à la lecture des historiques");
          } else {
            this.historiques = historiques;
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onBack() {
    if (this.idmateriel >= 0) {
      this.router.navigate(['/materiels', 'view', this.idmateriel]);
    } else {
      this.router.navigate(['/materiels']);
    }
  }
  onViewHistorique(id: number) {
//    this.router.navigate(['/historiques', 'view', id]);
  }


}
