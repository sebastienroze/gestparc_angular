import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypeMateriel } from '../models/TypeMateriel.model';
import { AuthService } from '../services/auth.service';
import { TypeMaterielsService } from '../services/typeMateriel.service';

@Component({
  selector: 'app-type-materiel-list',
  templateUrl: './type-materiel-list.component.html',
  styleUrls: ['./type-materiel-list.component.css']
})
export class TypeMaterielListComponent implements OnInit, OnDestroy {
  public typeMateriels: TypeMateriel[];
  public errorMessage: string;
  public idTypeMateriel = null;
  private routeSubscription: Subscription;
  public searchText: any;
  /***********/
  constructor(
    private materielsService: TypeMaterielsService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }
  /***********/

  ngOnInit(): void {
    this.materielsService.getTypeMateriels().then(
      (typeMateriels: TypeMateriel[]) => {
        if (typeMateriels === null) {
          console.log("Erreur à la lecture des type de materiels");
        } else {
          this.typeMateriels = typeMateriels;
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idTypeMateriel = routeParams.id;
    });

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onViewTypeMateriel(id: number) {
    this.router.navigate(['/typeMateriels', 'view', id]);
  }


}
