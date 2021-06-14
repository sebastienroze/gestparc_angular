import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppParams } from '../app.params';
import { Materiel } from '../models/Materiel.model';
import { MaterielDetail } from '../models/MaterielDetail.model';
import { Reparation } from '../models/Reparation.model';
import { AuthService } from '../services/auth.service';
import { MaterielsService } from '../services/materiel.service';

@Component({
  selector: 'app-single-materiel',
  templateUrl: './single-materiel.component.html',
  styleUrls: ['./single-materiel.component.css']
})
export class SingleMaterielComponent implements OnInit, OnDestroy {
  public materiel: Materiel = null;
  public location: Location = null;
  public reparation: Reparation = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private materielService: MaterielsService,
    private router: Router,
    private authService: AuthService,
    private appParams: AppParams,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
          this.materielService.getMaterielDetailById(routeParams.id).then(
            (materielDetail: MaterielDetail) => {
              if (materielDetail === null) {
                console.log("Erreur à la lecture du materiel détaillé" + routeParams.id);
                this.router.navigate(['/materiels']);
              } else {
                this.materiel = materielDetail.materiel;
                this.location = materielDetail.location;
                this.reparation = materielDetail.reparation;
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
    this.router.navigate(['/materiels']);
  }

  onNewMateriel() {
    this.router.navigate(['/materiels', 'new']);
  }

  onDeleteMateriel() {
    this.materielService.removeMateriel(this.materiel).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression du materiel" + this.materiel.id);
        } else {
          this.router.navigate(['/materiels']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }
  
  onHistoriqueMateriel() {
    this.router.navigate(['/materiels','historiques',  this.materiel.id]);
  }
  

  onModify() {
    this.router.navigate(['/materiels', 'edit', this.materiel.id]);
  }

}
