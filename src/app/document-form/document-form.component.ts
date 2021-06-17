import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from 'src/app/models/Document.model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentsService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {
  public documentForm: FormGroup;
  public errorMessage: string;
  public documentid = -1;
  private document: Document = null;
  public file:File=null;
  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private documentService: DocumentsService,
    private authService: AuthService,
    private router: Router,
  ) { }
  /***********/
  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    console.log("doc form"+id);
    if (id != undefined) {
      this.documentid = id;
      this.documentService.getDocumentById(id).then(
        (document: Document) => {
          if (document === null) {
            console.log("Erreur à la lecture du document");
          } else {
            this.document = document;
            this.setFormControl();
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    }
    this.initForm();
  }

  initForm() {
    this.documentForm = this.formBuilder.group({
      nom: ['', Validators.required],
      file: ['', Validators.nullValidator],
    })

  }

  setFormControl() {
    this.documentForm.patchValue({
      nom: this.document.nom,
    });
  }

  onBack() {
    if (this.documentid >= 0) {
      console.log("navigate " + this.documentid);
      this.router.navigate([this.documentService.routeDocument, 'documentsView', this.documentid]);
    } else {
      this.router.navigate([this.documentService.routeDocument,'documents']);
    }
  }

  fileChange(event) {
    var fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
    }
  }
  onSaveDocument() {  
    const nom = this.documentForm.get('nom').value;
//    const aDocument = new Document(this.documentid, nom,null,this.documentService.materiel,this.documentService.reparation);
    var formData:FormData = new FormData();
    var idmateriel = "";
    if (this.documentService.materiel!= null) { idmateriel = this.documentService.materiel.id +""};
    var idreparation = "";
    if (this.documentService.reparation!= null) { idreparation = this.documentService.reparation.id +""};
    var idretour = "";
    if (this.documentService.retour!= null) { idretour = this.documentService.retour.id +""};
    formData.append('id', this.documentid.toString());
    formData.append('nom', nom);
    formData.append('materiel', idmateriel);
    formData.append('reparation', idreparation);
    formData.append('retour', idretour);
    if (this.file!=null) {
      formData.append('file', this.file, this.file.name);      
    }
    if (this.documentid == -1) { // Création 
      this.documentService.createNewDocument(formData).then(
        (document: Document) => {
          if (document === null) {
            console.log("Erreur à la création du document");
          } else {
            console.log("ok cree")
            this.router.navigate([this.documentService.routeDocument,'documentsView',document.id ]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );
    } else { // mise à jour

      this.documentService.UpdateDocument(formData).then(
        (document: Document) => {
          if (document === null) {
            console.log("Erreur modification du document");
          } else {
            this.router.navigate([this.documentService.routeDocument, 'documentsView', document.id]);
          }
        }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
      );      
    }
  }
}
