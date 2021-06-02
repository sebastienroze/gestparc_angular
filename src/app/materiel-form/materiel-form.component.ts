import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Materiel } from 'src/app/models/Materiel.model';
import { AuthService } from 'src/app/services/auth.service';
import { MaterielsService } from 'src/app/services/materiel.service';
import { TypeMateriel } from '../models/TypeMateriel.model';

@Component({
  selector: 'app-materiel-form',
  templateUrl: './materiel-form.component.html',
  styleUrls: ['./materiel-form.component.css']
})
export class MaterielFormComponent implements OnInit {
  public materielForm: FormGroup;
  public errorMessage: string;
  public materielid = -1;
  private materiel: Materiel = null;
  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private materielService: MaterielsService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id != undefined) {
      this.materielid = id;
      this.materielService.getMaterielById(id).then(
        (materiel: Materiel) => {
          if (materiel === null) {
            console.log("Erreur à la lecture du materiel");
          } else {
            this.materiel = materiel;
            this.setFormControl();
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
    this.initForm();
  }

  initForm() {
    this.materielForm = this.formBuilder.group({
      nom: ['', Validators.required],
      reference: ['', Validators.required],
      etat: ['', Validators.nullValidator],
      typeMateriel: ['', Validators.nullValidator],
    })

  }

  setFormControl() {
    this.materielForm.patchValue({
      nom: this.materiel.nom,
      reference: this.materiel.reference,
      etat: this.materiel.etat,
      typeMateriel: this.materiel.typeMateriel,
    });
  }

  onBack() {
    if (this.materielid >= 0) {
      console.log("navigate " + this.materielid);
      this.router.navigate(['/materiels', 'view', this.materielid]);
    } else {
      this.router.navigate(['/materiels']);
    }
  }

  onSaveMateriel() {
    const nom = this.materielForm.get('nom').value;
    const reference = this.materielForm.get('reference').value;
    const etat = this.materielForm.get('etat').value;
    const typeMateriel = this.materielForm.get('typeMateriel').value;
    const atypeMateriel=  new TypeMateriel(typeMateriel, '');
    console.log(typeMateriel);
    console.log(atypeMateriel);

    const aMateriel = new Materiel(this.materielid, nom, reference, etat, atypeMateriel);
    /*
    aMateriel.nom = this.materielForm.get('nom').value;
    aMateriel.reference = this.materielForm.get('reference').value;
    aMateriel.etat = this.materielForm.get('etat').value;
    aMateriel.typeMateriel = this.materielForm.get('typeMateriel').value;
*/
    if (this.materielid == -1) { // Création 
      this.materielService.createNewMateriel(aMateriel).then(
        (materiel: Materiel) => {
          if (materiel === null) {
            console.log("Erreur à la création du materiel");
          } else {
            this.router.navigate(['/materiels']);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else { // mise à jour
      this.materielService.UpdateMateriel(aMateriel).then(
        (materiel: Materiel) => {
          if (materiel === null) {
            console.log("Erreur modification du materiel");
          } else {
            this.router.navigate(['/materiels', 'view', materiel]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }
}
