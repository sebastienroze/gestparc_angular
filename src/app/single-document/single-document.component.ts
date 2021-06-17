import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppParams } from '../app.params';
import { Document } from '../models/Document.model';
import { AuthService } from '../services/auth.service';
import { DocumentsService } from '../services/document.service';

@Component({
  selector: 'app-single-document',
  templateUrl: './single-document.component.html',
  styleUrls: ['./single-document.component.css']
})
export class SingleDocumentComponent implements OnInit, OnDestroy {
  public document: Document = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentsService,
    private router: Router,
    private authService: AuthService,
    public appParams : AppParams,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
    
      if (routeParams.id != null) {
        this.documentService.getDocumentById(routeParams.id).then(
          (document: Document) => {
            if (document === null) {
              console.log("Erreur à la lecture du document " + routeParams.id);
              this.router.navigate([this.documentService.routeDocument]);
            } else {
              this.document = document;
            }
          }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
        );
      }
    });
  }

  ngOnDestroy() {
//    this.routeSubscription.unsubscribe();
  }

  onBack() {
    this.router.navigate([this.documentService.routeDocument,'documents']);
  }

  onNewDocument() {
    this.router.navigate([this.documentService.routeDocument, 'documentsNew']);
  }

  onDeleteDocument() {
    this.documentService.removeDocument(this.document).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression du document" + this.document.id);
        } else {
          this.router.navigate([this.documentService.routeDocument,'documents']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  onModify() {
    this.router.navigate([this.documentService.routeDocument, 'documentsEdit', this.document.id]);
  }
         
  public getExtension() : string {
    
    if (this.document == null) return "";
    if (this.document.extension == null) return "";
    return this.document.extension;
  }
  public canVoir(): boolean {
    return (this.getExtension() != "") ;    
  }  

  onVoir() {    
    this.appParams.visionneurFile = this.appParams.apiUrl 
    +  "docs/document/fichier/"+ this.document.id+"/"+this.document.originalFilename;
    this.appParams.visionneurBack = [this.documentService.routeDocument,'documentsView',this.document.id+""]
    this.router.navigate(['/visionneur']);
  }  
}
