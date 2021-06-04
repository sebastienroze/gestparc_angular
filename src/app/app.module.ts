import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';

import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
// *********users********* 
import { UserListComponent } from './user-list/user-list.component';
import { SingleUserComponent } from './user-list/single-user/single-user.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { FilterUserListPipe } from './user-list/user-list.filter';
// *********cadres*********
import { CadreListComponent } from './cadre-list/cadre-list.component';
import { SingleCadreComponent } from './single-cadre/single-cadre.component';
import { CadreFormComponent } from './cadre-form/cadre-form.component';
import { FilterCadreListPipe } from './cadre-list.filter';

import { FilterMaterielListPipe } from './materiel-list.filter';
import { FilterTypeMaterielListPipe } from './typeMateriel-list.filter';
import { TypeMaterielListComponent } from './type-materiel-list/type-materiel-list.component';
import { MaterielListComponent } from './materiel-list/materiel-list.component';
import { TypeMaterielFormComponent } from './type-materiel-form/type-materiel-form.component';
import { MaterielFormComponent } from './materiel-form/materiel-form.component';
import { SingleTypeMaterielComponent } from './single-type-materiel/single-type-materiel.component';
import { SingleMaterielComponent } from './single-materiel/single-materiel.component';
import { SingleLocationComponent } from './single-location/single-location.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationListComponent } from './location-list/location-list.component';
import { FilterLocationListPipe } from './location-list.filter';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'about', component: AboutComponent },
  // *********users********* 
  { path: 'users', canActivate: [AuthGuardService], component: UserListComponent },
  { path: 'users/new', canActivate: [AuthGuardService], component: UserFormComponent },
  { path: 'users/view/:id', canActivate: [AuthGuardService], component: UserListComponent },
  //  { path: 'users/view/:id',canActivate:[AuthGuardService], component: SingleUserComponent },
  { path: 'users/edit/:id', canActivate: [AuthGuardService], component: UserFormComponent },
  // *********cadres*********
  { path: 'cadres', canActivate: [AuthGuardService], component: CadreListComponent },
  { path: 'cadres/new', canActivate: [AuthGuardService], component: CadreFormComponent },
  { path: 'cadres/view/:id', canActivate: [AuthGuardService], component: CadreListComponent },
  { path: 'cadres/edit/:id', canActivate: [AuthGuardService], component: CadreFormComponent },
  // *********TypeMatériels*********
  { path: 'typeMateriels', canActivate: [AuthGuardService], component: TypeMaterielListComponent },
  { path: 'typeMateriels/new', canActivate: [AuthGuardService], component: TypeMaterielFormComponent },
  { path: 'typeMateriels/view/:id', canActivate: [AuthGuardService], component: TypeMaterielListComponent },
  { path: 'typeMateriels/edit/:id', canActivate: [AuthGuardService], component: TypeMaterielFormComponent },
  // *********Matériels*********
  { path: 'materiels', canActivate: [AuthGuardService], component: MaterielListComponent },
  { path: 'materiels/new', canActivate: [AuthGuardService], component: MaterielFormComponent },
  { path: 'materiels/view/:id', canActivate: [AuthGuardService], component: MaterielListComponent },
  { path: 'materiels/edit/:id', canActivate: [AuthGuardService], component: MaterielFormComponent },
  // *********Locations*********
  { path: 'locations', canActivate: [AuthGuardService], component: LocationListComponent },
  { path: 'locations/new', canActivate: [AuthGuardService], component: LocationFormComponent },
  { path: 'locations/view/:id', canActivate: [AuthGuardService], component: LocationListComponent },
  { path: 'locations/edit/:id', canActivate: [AuthGuardService], component: LocationFormComponent },
  // ******************

  { path: '', redirectTo: 'locations', pathMatch: 'full' },
  { path: '**', redirectTo: 'locations' }
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    AboutComponent,

    UserListComponent,
    UserFormComponent,
    SingleUserComponent,
    FilterUserListPipe,

    CadreListComponent,
    CadreFormComponent,
    SingleCadreComponent,
    FilterCadreListPipe,

    TypeMaterielFormComponent,
    TypeMaterielListComponent,
    SingleTypeMaterielComponent,
    FilterTypeMaterielListPipe,

    MaterielListComponent,
    MaterielFormComponent,
    FilterMaterielListPipe,
    SingleMaterielComponent,

    SingleLocationComponent,
    FilterLocationListPipe,
    LocationFormComponent,
    LocationListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
