import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Materiel } from '../models/Materiel.model';
import { AuthService } from '../services/auth.service';
import { MaterielsService } from '../services/materiel.service';

@Component({
  selector: 'app-single-materiel',
  templateUrl: './single-materiel.component.html',
  styleUrls: ['./single-materiel.component.css']
})
export class SingleMaterielComponent implements OnInit, OnDestroy {
  public materiel: Materiel = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private materielService: MaterielsService,
    private router: Router,
    private authService: AuthService,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        this.materielService.getMaterielById(routeParams.id).then(
          (materiel: Materiel) => {
            if (materiel === null) {
              console.log("Erreur à la lecture du materiel " + routeParams.id);
              this.router.navigate(['/materiels']);
            } else {
              this.materiel = materiel;
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

  onModify() {
    this.router.navigate(['/materiels', 'edit', this.materiel.id]);
  }

}
