import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Retour } from '../models/Retour.model';
import { AuthService } from '../services/auth.service';
import { DocumentsService } from '../services/document.service';
import { RetoursService } from '../services/retours.service';

@Component({
  selector: 'app-single-retour',
  templateUrl: './single-retour.component.html',
  styleUrls: ['./single-retour.component.css']
})
export class SingleRetourComponent implements OnInit, OnDestroy {
  public retour: Retour = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private retourService: RetoursService,
    private documentService: DocumentsService,
    private router: Router,
    private authService: AuthService,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        this.retourService.getRetourById(routeParams.id).then(
          (retour: Retour) => {
            if (retour === null) {
              console.log("Erreur à la lecture du retour " + routeParams.id);
              this.router.navigate(['/retours']);
            } else {
              this.retour = retour;
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
    this.router.navigate(['/retours']);
  }

  getReference() : string {
    if (this.retour == null) return "";
    if (this.retour.location == null) return "";
    if (this.retour.location.materiel == null) return "";
    return this.retour.location.materiel.reference;
  }

  getNomMateriel() : string {
    if (this.retour == null) return "";
    if (this.retour.location == null) return "";
    if (this.retour.location.materiel == null) return "";
    return this.retour.location.materiel.nom;
  }

  getDescriptionTypeMateriel() : string {
    if (this.retour == null) return "";
    if (this.retour.location == null) return "";
    if (this.retour.location.typeMateriel == null) return "";
    return this.retour.location.typeMateriel.description;
  }   

  getDateDebut() : Date {
    if (this.retour == null) return null;
    if (this.retour.location == null) return null;
    return this.retour.location.date_debut;
  }  

  getDateRetour() : Date {
    if (this.retour == null) return null;
    if (this.retour.location == null) return null;
    return this.retour.location.date_retour;
  }  

  getLocataire() : string {
    if (this.retour == null) return null;
    if (this.retour.location == null) return null;
    if (this.retour.location.utilisateur == null) return null;
    return this.retour.location.utilisateur.login;
  }  
    
  
  onNewRetour() {
    console.log("gotetour")
    this.router.navigate(['/retours', 'new']);

  }

  onDeleteRetour() {
    this.retourService.removeRetour(this.retour).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression du retour" + this.retour.id);
        } else {
          this.router.navigate(['/retours']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  onModify() {
    this.router.navigate(['/retours', 'edit', this.retour.id]);
  }

  onDocumentRetour() {
    this.documentService.VoirDocuments(null,null,this.retour);
  }  

}
