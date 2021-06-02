import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Materiel } from '../models/Materiel.model';
import { AuthService } from '../services/auth.service';
import { MaterielsService } from '../services/materiel.service';

@Component({
  selector: 'app-materiel-list',
  templateUrl: './materiel-list.component.html',
  styleUrls: ['./materiel-list.component.css']
})
export class MaterielListComponent implements OnInit, OnDestroy {
  public materiels: Materiel[];
  public errorMessage: string;
  public idMateriel = null;
  private routeSubscription: Subscription;
  public searchText: any;
  /***********/
  constructor(
    private materielsService: MaterielsService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }
  /***********/

  ngOnInit(): void {
    this.materielsService.getMateriels().then(
      (materiels: Materiel[]) => {
        if (materiels === null) {
          console.log("Erreur à la lecture des materiels");
        } else {
          this.materiels = materiels;
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idMateriel = routeParams.id;
    });

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onViewMateriel(id: number) {
    this.router.navigate(['/materiels', 'view', id]);
  }


}
