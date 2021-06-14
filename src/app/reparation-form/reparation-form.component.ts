import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from 'src/app/models/Reparation.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReparationsService } from 'src/app/services/reparation.service';
import { Materiel } from '../models/Materiel.model';
import { MaterielsService } from '../services/materiel.service';

@Component({
  selector: 'app-reparation-form',
  templateUrl: './reparation-form.component.html',
  styleUrls: ['./reparation-form.component.css']
})
export class ReparationFormComponent implements OnInit {
  public reparationForm: FormGroup;
  public reparationUpdateForm: FormGroup;
  public reparationRepareForm: FormGroup;
  public errorMessage: string;
  public reparationid = -1;
  public reparation: Reparation = null;
  public materiels: Materiel[] = null;

  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reparationService: ReparationsService,
    private materielService: MaterielsService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.materielService.getMateriels().then(
      (materiels: Materiel[]) => {
        this.materiels = materiels;
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
    if (id != undefined) {
      this.reparationid = id;
      this.reparationService.getReparationById(id).then(
        (reparation: Reparation) => {
          if (reparation === null) {
            console.log("Erreur à la lecture de la reparation");
          } else {
            this.reparation = reparation;
            this.setFormControl();
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
    this.initForm();
  }

  initForm() {
    this.reparationForm = this.formBuilder.group({
      materiel: ['', Validators.required],
      date_retour: ['', Validators.nullValidator],
      etatCasse: ['', Validators.required],
    })

    this.reparationUpdateForm = this.formBuilder.group({
      date_retour: ['', Validators.required],
    })

    this.reparationRepareForm = this.formBuilder.group({
      etatRepare: ['', Validators.required],
    })
  }

  setFormControl() {
    this.reparationForm.patchValue({
      materiel: this.reparation.materiel.id,
      date_retour: this.reparation.date_retour,
      etatCasse: this.reparation.etatCasse,
    });

    this.reparationUpdateForm.patchValue({
      date_retour: this.reparation.date_retour,
    });

    this.reparationRepareForm.patchValue({
    });
  }

  onBack() {
    if (this.reparationid >= 0) {
      console.log("navigate " + this.reparationid);
      this.router.navigate(['/reparations', 'view', this.reparationid]);
    } else {
      this.router.navigate(['/reparations']);
    }
  }

  onSaveReparation() {
    const etat = 0;
    const date_retour = this.reparationForm.get('date_retour').value;
    const etatCasse = this.reparationForm.get('etatCasse').value;
    const idMateriel = this.reparationForm.get('materiel').value;
    const materiel = new Materiel(idMateriel, null, null, null, null);

    const aReparation = new Reparation(this.reparationid, etat, materiel, null, date_retour, null, etatCasse, null);

    if (this.reparationid == -1) { // Création 
      this.reparationService.createNewReparation(aReparation).then(
        (reparation: Reparation) => {
          if (reparation === null) {
            console.log("Erreur à la création du reparation");
          } else {
            this.router.navigate(['/reparations']);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }

  onUpdateReparation() {
    const etat = 0;
    const date_retour = this.reparationUpdateForm.get('date_retour').value;
    const etatCasse = null;
    const materiel = null;
    const aReparation = new Reparation(this.reparationid, etat, materiel, null, date_retour, null, etatCasse, null);
    this.reparationService.UpdateReparation(aReparation).then(
      (reparation: Reparation) => {
        if (reparation === null) {
          console.log("Erreur modification du reparation");
        } else {
          this.router.navigate(['/reparations', 'view', reparation]);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }
  onRepareReparation() {
    const etat = 1;
    const date_retour = this.reparationUpdateForm.get('date_retour').value;;
    const etatCasse = null;
    const materiel = null;
    const etatRepare = this.reparationRepareForm.get('etatRepare').value;;
    const aReparation = new Reparation(this.reparationid, etat, materiel, null, date_retour, null, etatCasse, etatRepare);
    this.reparationService.UpdateReparation(aReparation).then(
      (reparation: Reparation) => {
        if (reparation === null) {
          console.log("Erreur modification du reparation");
        } else {
          this.router.navigate(['/reparations', 'view', reparation]);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }


}
