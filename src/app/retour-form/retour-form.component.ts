import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Retour } from 'src/app/models/Retour.model';
import { AuthService } from 'src/app/services/auth.service';
import { RetoursService } from 'src/app/services/retours.service';
import { LocationsService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/Location.model';
import { Materiel } from '../models/Materiel.model';

@Component({
  selector: 'app-retour-form',
  templateUrl: './retour-form.component.html',
  styleUrls: ['./retour-form.component.css']
})

export class RetourFormComponent implements OnInit {
  public retourForm: FormGroup;
  public errorMessage: string;
  public retourid = -1;
  private retour: Retour = null;
  public locationsEnPret: Location[] = null;
  public etatMateriel: string;

  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private retourService: RetoursService,
    private locationsService: LocationsService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/

  produceLocationsEnPret(): void {
    this.locationsService.getLocationsEnPret().then(
      (locations: Location[]) => {
        this.locationsEnPret = locations;
        console.log(locations);
      },
      (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    )
  }

  ngOnInit(): void {
    this.produceLocationsEnPret();
    const id = this.route.snapshot.params['id'];
    this.initForm();

    if (id != undefined) {
      this.retourid = id;
      this.retourService.getRetourById(id).then(
        (retour: Retour) => {
          if (retour === null) {
            console.log("Erreur à la lecture du retour");
          } else {
            this.retour = retour;
            this.setFormControl();
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else {
      this.retour = new Retour(null, null, null, null, null)
      this.setFormControl();
    }
  }

  initForm() {
    this.retourForm = this.formBuilder.group({
      audit: ['', Validators.required],
      etatEntrant: ['', Validators.nullValidator],
      etatSortant: ['', Validators.required],
      location: ['', Validators.required],
    })
  }

  setFormControl() {
    this.retourForm.patchValue({
      audit: this.retour.audit,
      etatEntrant: this.retour.etatEntrant,
      etatSortant: this.retour.etatSortant,
      location: this.retour.location.id,
    });

    this.etatMateriel = this.retour.location.materiel.etat;
  }

  onBack() {
    if (this.retourid >= 0) {
      console.log("navigate " + this.retourid);
      this.router.navigate(['/retours', 'view', this.retourid]);
    } else {
      this.router.navigate(['/retours']);
    }
  }

  onSelectReference() {
    const locationid = this.retourForm.get('location').value;
    console.log(this.locationsEnPret)
    const location = this.locationsEnPret.find(loc => {
      return loc.id == locationid
    })
    this.etatMateriel = location.materiel.etat;
  }

  onSaveRetour() {
    const audit = this.retourForm.get('audit').value;
    const etatEntrant = this.retourForm.get('etatEntrant').value;
    const etatSortant = this.retourForm.get('etatSortant').value;
    const locationid = this.retourForm.get('location').value;
    const location = new Location(locationid, null, null, null, null, null, null, null);
    const aRetour = new Retour(this.retourid, audit, etatEntrant, etatSortant, location);
    if (this.retourid == -1) { // Création 
      this.retourService.createNewRetour(aRetour).then(
        (retour: Retour) => {
          if (retour === null) {
            console.log("Erreur à la création du retour");
          } else {
            this.router.navigate(['/retours']);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else { // mise à jour
      this.retourService.UpdateRetour(aRetour).then(
        (retour: Retour) => {
          if (retour === null) {
            console.log("Erreur modification du retour");
          } else {
            this.router.navigate(['/retours', 'view', retour]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }
}
