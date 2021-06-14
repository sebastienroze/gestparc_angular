import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/Location.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocationsService } from 'src/app/services/location.service';
import { AppParams } from '../app.params';
import { Cadre } from '../models/Cadre.model';
import { Materiel } from '../models/Materiel.model';
import { TypeMateriel } from '../models/TypeMateriel.model';
import { CadresService } from '../services/cadres.service';
import { MaterielsService } from '../services/materiel.service';
import { TypeMaterielsService } from '../services/typeMateriel.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
  public locationForm: FormGroup;
  public locationValiderForm: FormGroup;
  public errorMessage: string;
  public locationid = -1;
  private location: Location = null;
  public typeMateriels: TypeMateriel[] = null;
  public materiels: Materiel[] = null;
  public cadres: Cadre[];


  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public appParams: AppParams,
    private locationService: LocationsService,
    private materielService: MaterielsService,
    private cadresService: CadresService,
    private typeMaterielService: TypeMaterielsService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/
  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];

    this.cadresService.getCadres().then(
      (cadres: Cadre[]) => {
        this.cadres = cadres;
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );

    this.typeMaterielService.getTypeMateriels().then(
      (typeMateriels: TypeMateriel[]) => {
        this.typeMateriels = typeMateriels;
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );

    this.initForm();

    if (id != undefined) {
      this.locationid = id;
      if (this.appParams.isAdmin()) {
        this.materielService.getMaterielsForLocation(id).then(
          (materiels: Materiel[]) => {
            materiels.push(this.location.materiel)
            this.materiels = materiels;
          }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
        );
      }

      this.locationService.getLocationById(id).then(
        (location: Location) => {
          if (location === null) {
            console.log("Erreur à la lecture de la location");
          } else {
            this.setLocation(location);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else {
      this.location = new Location(null, 0, null, null, null, null, null, null)

      this.setFormControl();
    }
  }

  setLocation(location: Location) {
    this.location = location;
    this.setFormControl();

  }
  initForm() {
    this.locationForm = this.formBuilder.group({
      date_debut: ['', Validators.required],
      date_retour: ['', Validators.required],
      typeMateriel: ['', Validators.required],
      cadre: ['', Validators.required],
    })

    this.locationValiderForm = this.formBuilder.group({
      etat: ['', Validators.nullValidator],
      materiel: ['', Validators.nullValidator],
    })
  }

  getMaterielID(): number {
    if (this.location.materiel == null) return null
    return this.location.materiel.id
  }

  getMaterielNom(): string {
    if (this.location.materiel == null) return null
    return this.location.materiel.nom
  }
  getMaterielReference(): string {
    if (this.location.materiel == null) return null
    return this.location.materiel.reference
  }

  getMaterielEtat(): string {
    if (this.location.materiel == null) return null
    return this.location.materiel.etat
  }

  getTypeMaterielID(): number {
    if (this.location.typeMateriel == null) return null
    return this.location.typeMateriel.id
  }
  getCadreID(): number {
    if (this.location.cadre == null) return null
    return this.location.cadre.id
  }
  getUtilisateurLogin(): string {
    if (this.location == null) return null
    if (this.location.utilisateur == null) return null
    return this.location.utilisateur.login
  }

  isOwner(): boolean {
    if (this.getUtilisateurLogin() == null) {
      return true;
    }
    if (this.getUtilisateurLogin() == this.authService.login) {
      return true;
    }
    return false;
  }

  getEtat():number {
    if (this.location == null) return 0
    return this.location.etat
  }
  canModify(): boolean {
    return this.isOwner() && (this.getEtat() == 0);
  }
  isPourValider(): boolean {
    if (!this.appParams.isAdmin()) return false;
    if (this.location == null) return false;
    if (this.location.etat == 0) return true;
    if (this.location.etat == 1) return true;
    return false;
  }

  isPourPret(): boolean {
    if (!this.appParams.isAdmin()) return false;
    if (this.location == null) return false;
    if (this.location.etat == 1) return true;
    return false;
  }

  public getEtatLocations(): string[] {
    return this.locationService.getEtatLocation();
  }

  public getEtatLocation(): string {
    if (this.location != null) return this.locationService.getEtatLocation()[this.location.etat];
    return null;
  }

  setFormControl() {
    this.locationForm.patchValue({
      date_debut: this.location.date_debut,
      date_retour: this.location.date_retour,
      typeMateriel: this.getTypeMaterielID(),
      cadre: this.getCadreID(),

    });

    this.locationValiderForm.patchValue({
      etat: this.location.etat,
      materiel: this.getMaterielID(),

    });
  }

  onBack() {
    if (this.locationid >= 0) {
      this.router.navigate(['/locations', 'view', this.locationid]);
    } else {
      this.router.navigate(['/locations']);
    }
  }

  onSaveLocation() {
    const etat = null;
    const date_debut = this.locationForm.get('date_debut').value;
    const date_retour = this.locationForm.get('date_retour').value;
    const typeMateriel = new TypeMateriel(this.locationForm.get('typeMateriel').value, null);
    const utilisateur = null;
    const materiel = null;
    const cadre = new Cadre(this.locationForm.get('cadre').value, null);

    const aLocation = new Location(this.locationid, etat, cadre, date_debut, date_retour, typeMateriel, materiel, utilisateur);
    if (this.locationid == -1) { // Création 
      this.locationService.createNewLocation(aLocation).then(
        (location: Location) => {
          if (location === null) {
            console.log("Erreur à la création du location");
          } else {
            this.router.navigate(['/locations']);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else { // mise à jour
      this.locationService.UpdateLocation(aLocation).then(
        (location: Location) => {
          if (location === null) {
            console.log("Erreur modification de la location");
          } else {
            this.router.navigate(['/locations', 'view', location]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }

  onValiderSaveLocation() {
    const etat = 1;
    const date_debut = null;
    const date_retour = null;
    const typeMateriel = null;
    const utilisateur = null;
    const materielid = this.locationValiderForm.get('materiel').value;
    var materiel = null
    const cadre = null;

    if (materielid != null) {
      materiel = new Materiel(materielid, null, null, null, null);
    }
    const aLocation = new Location(this.locationid, etat, cadre, date_debut, date_retour, typeMateriel, materiel, utilisateur);
    if (this.locationid != -1) { // mise à jour
      this.locationService.UpdateAdminLocation(aLocation).then(
        (location: Location) => {
          if (location === null) {
            console.log("Erreur modification de la location");
          } else {
            this.router.navigate(['/locations', 'view', location]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }

  onPreterSaveLocation() {
    const etat = 2;
    const date_debut = null;
    const date_retour = null;
    const typeMateriel = null;
    const utilisateur = null;
    const cadre = null;
    var materiel = null
    const aLocation = new Location(this.locationid, etat, cadre, date_debut, date_retour, typeMateriel, materiel, utilisateur);
    if (this.locationid != -1) { // mise à jour
      this.locationService.UpdateAdminLocation(aLocation).then(
        (location: Location) => {
          if (location === null) {
            console.log("Erreur modification de la location");
          } else {
            this.router.navigate(['/locations', 'view', location]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }

}
