import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cadre } from '../models/Cadre.model';
import { AuthService } from '../services/auth.service';
import { CadresService } from '../services/cadres.service';

@Component({
  selector: 'app-single-cadre',
  templateUrl: './single-cadre.component.html',
  styleUrls: ['./single-cadre.component.css']
})
export class SingleCadreComponent implements OnInit, OnDestroy {
  public cadre: Cadre = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private cadreService: CadresService,
    private router: Router,
    private authService: AuthService,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        this.cadreService.getCadreById(routeParams.id).then(
          (cadre: Cadre) => {
            if (cadre === null) {
              console.log("Erreur à la lecture du cadre " + routeParams.id);
              this.router.navigate(['/cadres']);
            } else {
              this.cadre = cadre;
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
    this.router.navigate(['/cadres']);
  }

  onNewCadre() {
    this.router.navigate(['/cadres', 'new']);
  }

  onDeleteCadre() {
    this.cadreService.removeCadre(this.cadre).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression du cadre" + this.cadre.id);
        } else {
          this.router.navigate(['/cadres']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  onModify() {
    this.router.navigate(['/cadres', 'edit', this.cadre.id]);
  }

}
