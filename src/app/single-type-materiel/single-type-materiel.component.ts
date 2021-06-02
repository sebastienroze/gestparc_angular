import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypeMateriel } from '../models/TypeMateriel.model';
import { AuthService } from '../services/auth.service';
import { TypeMaterielsService } from '../services/typeMateriel.service';

@Component({
  selector: 'app-single-type-materiel',
  templateUrl: './single-type-materiel.component.html',
  styleUrls: ['./single-type-materiel.component.css']
})
export class SingleTypeMaterielComponent implements OnInit, OnDestroy {
  public typeMateriel: TypeMateriel = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private typeMaterielService: TypeMaterielsService,
    private router: Router,
    private authService: AuthService,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        this.typeMaterielService.getTypeMaterielById(routeParams.id).then(
          (typeMateriel: TypeMateriel) => {
            if (typeMateriel === null) {
              console.log("Erreur à la lecture du type de materiel " + routeParams.id);
              this.router.navigate(['/typeMateriels']);
            } else {
              this.typeMateriel = typeMateriel;
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
    this.router.navigate(['/typeMateriels']);
  }

  onNewTypeMateriel() {
    this.router.navigate(['/typeMateriels', 'new']);
  }

  onDeleteTypeMateriel() {
    this.typeMaterielService.removeTypeMateriel(this.typeMateriel).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression du type de materiel" + this.typeMateriel.id);
        } else {
          this.router.navigate(['/typeMateriels']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  onModify() {
    this.router.navigate(['/typeMateriels', 'edit', this.typeMateriel.id]);
  }

}
