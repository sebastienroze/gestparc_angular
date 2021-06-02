import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cadre } from '../models/Cadre.model';
import { AuthService } from '../services/auth.service';
import { CadresService } from '../services/cadres.service';

@Component({
  selector: 'app-cadre-list',
  templateUrl: './cadre-list.component.html',
  styleUrls: ['./cadre-list.component.css']
})
export class CadreListComponent implements OnInit, OnDestroy {
  public cadres: Cadre[];
  public errorMessage: string;
  public idCadre = null;
  private routeSubscription: Subscription;
  public searchText: any;
  /***********/
  constructor(
    private cadresService: CadresService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }
  /***********/

  ngOnInit(): void {
    this.cadresService.getCadres().then(
      (cadres: Cadre[]) => {
        if (cadres === null) {
          console.log("Erreur à la lecture des cadres");
        } else {
          this.cadres = cadres;
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idCadre = routeParams.id;
    });

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onViewCadre(id: number) {
    this.router.navigate(['/cadres', 'view', id]);
  }


}
