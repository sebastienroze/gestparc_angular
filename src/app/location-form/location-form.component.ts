import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/Location.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocationsService } from 'src/app/services/location.service';
import { Materiel } from '../models/Materiel.model';
import { TypeMateriel } from '../models/TypeMateriel.model';
import { MaterielsService } from '../services/materiel.service';
import { TypeMaterielsService } from '../services/typeMateriel.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
  public locationForm: FormGroup;
  public locationAdminForm: FormGroup;
  public errorMessage: string;
  public locationid = -1;
  private location: Location = null;
  public typeMateriels: TypeMateriel[] = null;
  public materiels: Materiel[] = null;

  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private locationService: LocationsService,
    private materielService: MaterielsService,
    private typeMaterielService: TypeMaterielsService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.typeMaterielService.getTypeMateriels().then(
      (typeMateriels: TypeMateriel[]) => {
        this.typeMateriels = typeMateriels;
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
    this.materielService.getMateriels().then(
      (materiels: Materiel[]) => {
        this.materiels = materiels;
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );

    this.initForm();

    if (id != undefined) {
      this.locationid = id;
      this.locationService.getLocationById(id).then(
        (location: Location) => {
          if (location === null) {
            console.log("Erreur à la lecture de la location");
          } else {
            this.location = location;
            this.setFormControl();
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else {
      this.location = new Location(null, false, null, null, null, null, null)
      this.setFormControl();
    }
  }

  initForm() {
    this.locationForm = this.formBuilder.group({
      date_debut: ['date_debut', Validators.nullValidator],
      date_retour: ['date_retour', Validators.nullValidator],
      typeMateriel: ['typeMateriel', Validators.nullValidator],
    })

    this.locationAdminForm = this.formBuilder.group({
      valide: ['valide', Validators.nullValidator],
      materiel: ['materiel', Validators.nullValidator],
    })   
  }

  getMaterielID(): number {
    if (this.location.materiel == null) return null
    return this.location.materiel.id
  }
  getTypeMaterielID(): number {
    if (this.location.typeMateriel == null) return null
    return this.location.typeMateriel.id
  }
  getUtilisateurID(): number {
    if (this.location.utilisateur == null) return null
    return this.location.utilisateur.id
  }

  setFormControl() {
    this.locationForm.patchValue({
      date_debut: this.location.date_debut,
      date_retour: this.location.date_retour,
      typeMateriel: this.getTypeMaterielID(),
    });

    this.locationAdminForm.patchValue({
      valide: this.location.valide,
      materiel: this.getMaterielID(),
    });    
  }

  onBack() {
    if (this.locationid >= 0) {
      console.log("navigate " + this.locationid);
      this.router.navigate(['/locations', 'view', this.locationid]);
    } else {
      this.router.navigate(['/locations']);
    }
  }

  onSaveLocation() {
    const valide = this.locationAdminForm.get('valide').value;
    const date_debut = this.locationForm.get('date_debut').value;
    const date_retour = this.locationForm.get('date_retour').value;
    const typeMateriel = new TypeMateriel(this.locationForm.get('typeMateriel').value, null);
    const utilisateur = null;
    const materiel = null;
    const aLocation = new Location(this.locationid, valide, date_debut, date_retour, typeMateriel, materiel, utilisateur);
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
      console.log(aLocation);
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

  onAdminSaveLocation() {
    const valide = this.locationAdminForm.get('valide').value;
    const date_debut = this.locationForm.get('date_debut').value;
    const date_retour = this.locationForm.get('date_retour').value;
    const typeMateriel = new TypeMateriel(this.locationForm.get('typeMateriel').value, null);
    const utilisateur = null
    const materielid = this.locationAdminForm.get('materiel').value;
    var materiel = null
    console.log(materielid)
    if (materielid != null) {
      materiel = new Materiel(materielid, null, null, null, null);
    }
    const aLocation = new Location(this.locationid, valide, date_debut, date_retour, typeMateriel, materiel, utilisateur);
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
