import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cadre } from 'src/app/models/Cadre.model';
import { AuthService } from 'src/app/services/auth.service';
import { CadresService } from 'src/app/services/cadres.service';

@Component({
  selector: 'app-cadre-form',
  templateUrl: './cadre-form.component.html',
  styleUrls: ['./cadre-form.component.css']
})
export class CadreFormComponent implements OnInit {
  public cadreForm: FormGroup;
  public errorMessage: string;
  public cadreid = -1;
  private cadre: Cadre = null;
  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cadreService: CadresService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id != undefined) {
      this.cadreid = id;
      this.cadreService.getCadreById(id).then(
        (cadre: Cadre) => {
          if (cadre === null) {
            console.log("Erreur à la lecture du cadre");
          } else {
            this.cadre = cadre;
            this.setFormControl();            
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
    this.initForm();
  }

  initForm() {
    this.cadreForm = this.formBuilder.group({
      description: ['description', Validators.required],
    })

  }

  setFormControl() {
    this.cadreForm.patchValue({
      description:this.cadre.description,
    });
  }

  onBack() {
    if (this.cadreid >= 0) {
      console.log("navigate " + this.cadreid);
      this.router.navigate(['/cadres', 'view', this.cadreid]);
    } else {
      this.router.navigate(['/cadres']);
    }
  }

  onSaveCadre() {
    const description = this.cadreForm.get('description').value;
    const aCadre = new Cadre(this.cadreid, description);
    aCadre.description = this.cadreForm.get('description').value;
    if (this.cadreid == -1) { // Création 
      this.cadreService.createNewCadre(aCadre).then(
        (cadre: Cadre) => {
          if (cadre === null) {
            console.log("Erreur à la création du cadre");
          } else {
            this.router.navigate(['/cadres']);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else { // mise à jour
      this.cadreService.UpdateCadre(aCadre).then(
        (cadre: Cadre) => {
          if (cadre === null) {
            console.log("Erreur modification du cadre");
          } else {
            this.router.navigate(['/cadres', 'view', cadre]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
  }
}
