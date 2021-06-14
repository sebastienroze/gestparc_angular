import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Retour } from '../models/Retour.model';
import { AuthService } from '../services/auth.service';
import { RetoursService } from '../services/retours.service';

@Component({
  selector: 'app-retour-list',
  templateUrl: './retour-list.component.html',
  styleUrls: ['./retour-list.component.css']
})
export class RetourListComponent implements OnInit, OnDestroy {
  public retours: Retour[];
  public errorMessage: string;
  public idRetour = null;
  private routeSubscription: Subscription;
  public searchText: any;
  /***********/
  constructor(
    private retoursService: RetoursService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }
  /***********/

  ngOnInit(): void {
    this.retoursService.getRetours().then(
      (retours: Retour[]) => {
        if (retours === null) {
          console.log("Erreur à la lecture des retours");
        } else {
          this.retours = retours;
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idRetour = routeParams.id;
    });

  }
  
  getReference(retour: Retour) : string {
    if (retour == null) return "";
    if (retour.location == null) return "";
    if (retour.location.materiel == null) return "";
    return retour.location.materiel.reference;
  }

  getNomMateriel(retour: Retour) : string {
    if (retour == null) return "";
    if (retour.location == null) return "";
    if (retour.location.materiel == null) return "";
    return retour.location.materiel.nom;
  }

  getDescriptionTypeMateriel(retour: Retour) : string {
    if (retour == null) return "";
    if (retour.location == null) return "";
    if (retour.location.typeMateriel == null) return "";
    return retour.location.typeMateriel.description;
  }   

  getDateDebut(retour: Retour) : Date {
    if (retour == null) return null;
    if (retour.location == null) return null;
    return retour.location.date_debut;
  }  

  getDateRetour(retour: Retour) : Date {
    if (retour == null) return null;
    if (retour.location == null) return null;
    return retour.location.date_retour;
  }  

  getLocataire(retour: Retour) : string {
    if (retour == null) return null;
    if (retour.location == null) return null;
    if (retour.location.utilisateur == null) return null;
    return retour.location.utilisateur.login;
  }  
      

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onViewRetour(id: number) {
    this.router.navigate(['/retours', 'view', id]);
  }


}
