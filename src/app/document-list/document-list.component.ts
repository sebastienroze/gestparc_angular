import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../models/Document.model';
import { AuthService } from '../services/auth.service';
import { DocumentsService } from '../services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  public documents: Document[];
  public errorMessage: string;
  public idDocument = null;
  private routeSubscription: Subscription;
  public searchText: any;
  /***********/
  constructor(
    public documentsService: DocumentsService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }
  /***********/

  ngOnInit(): void {
    var promiseDocumemt : Promise<Document[]>;
    if (this.documentsService.reparation!=null) {
       promiseDocumemt = this.documentsService.getDocumentsReparation(this.documentsService.reparation);
    } else if (this.documentsService.materiel!=null) {
      promiseDocumemt = this.documentsService.getDocumentsMateriel(this.documentsService.materiel);
    } else if (this.documentsService.retour!=null) {
      promiseDocumemt = this.documentsService.getDocumentsRetour(this.documentsService.retour);
    }

console.log((((promiseDocumemt))));
    promiseDocumemt.then(
      (documents: Document[]) => {
        if (documents === null) {
          console.log("Erreur à la lecture des documents");
        } else {
          this.documents = documents;
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );

    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idDocument = routeParams.id;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onBack() {
    if (this.documentsService.reparation != null) {
      this.router.navigate([this.documentsService.routeDocument,'view',this.documentsService.reparation.id]);
    }
    if (this.documentsService.materiel != null) {
      this.router.navigate([this.documentsService.routeDocument,'view',this.documentsService.materiel.id]);
    }
    if (this.documentsService.retour != null) {
      this.router.navigate([this.documentsService.routeDocument,'view',this.documentsService.retour.id]);
    }
}

  onViewDocument(id: number) {
    console.log("view " + id)
    this.router.navigate([this.documentsService.routeDocument, 'documentsView', id]);
  }


}
