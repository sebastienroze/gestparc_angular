import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMateriel } from 'src/app/models/TypeMateriel.model';
import { AuthService } from 'src/app/services/auth.service';
import { TypeMaterielsService } from 'src/app/services/typeMateriel.service';

@Component({
  selector: 'app-typeMateriel-form',
  templateUrl: './type-materiel-form.component.html',
  styleUrls: ['./type-materiel-form.component.css']
})
export class TypeMaterielFormComponent implements OnInit {
  public typeMaterielForm: FormGroup;
  public errorMessage: string;
  public typeMaterielid = -1;
  private typeMateriel: TypeMateriel = null;
  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private typeMaterielService: TypeMaterielsService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id != undefined) {
      this.typeMaterielid = id;
      this.typeMaterielService.getTypeMaterielById(id).then(
        (typeMateriel: TypeMateriel) => {
          if (typeMateriel === null) {
            console.log("Erreur à la lecture du type de materiel");
          } else {
            this.typeMateriel = typeMateriel;
            this.setFormControl();
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
    this.initForm();
  }

  initForm() {
    this.typeMaterielForm = this.formBuilder.group({
      description: ['', Validators.required],
    })

  }

  setFormControl() {
    this.typeMaterielForm.patchValue({
      description:this.typeMateriel.description,
    });
  }
  
  onBack() {
    if (this.typeMaterielid >= 0) {
      console.log("navigate " + this.typeMaterielid);
      this.router.navigate(['/typeMateriels', 'view', this.typeMaterielid]);
    } else {
      this.router.navigate(['/typeMateriels']);
    }
  }

  onSaveTypeMateriel() {
    const description = this.typeMaterielForm.get('description').value;
    const aTypeMateriel = new TypeMateriel(this.typeMaterielid, description);
    aTypeMateriel.description = this.typeMaterielForm.get('description').value;
    if (this.typeMaterielid == -1) { // Création 
      this.typeMaterielService.createNewTypeMateriel(aTypeMateriel).then(
        (typeMateriel: TypeMateriel) => {
          if (typeMateriel === null) {
            console.log("Erreur à la création du type de materiel");
          } else {
            this.router.navigate(['/typeMateriels']);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else { // mise à jour
      this.typeMaterielService.UpdateTypeMateriel(aTypeMateriel).then(
        (typeMateriel: TypeMateriel) => {
          if (typeMateriel === null) {
            console.log("Erreur modification du type de materiel");
          } else {
            this.router.navigate(['/typeMateriels', 'view', typeMateriel]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }
}
