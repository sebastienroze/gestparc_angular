import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { UserListComponent } from './user-list/user-list.component';
import { SingleUserComponent } from './user-list/single-user/single-user.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FilterUserListPipe } from './user-list/user-list.filter';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', canActivate:[AuthGuardService],component: UserListComponent },
  { path: 'users/new',canActivate:[AuthGuardService], component: UserFormComponent },
  { path: 'users/view/:id',canActivate:[AuthGuardService], component: UserListComponent },
//  { path: 'users/view/:id',canActivate:[AuthGuardService], component: SingleUserComponent },
  { path: 'users/edit/:id',canActivate:[AuthGuardService], component: UserFormComponent },
  { path: '', redirectTo: 'users',pathMatch : 'full' },
  { path: '**', redirectTo: 'users'}
]
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserListComponent,
    SingleUserComponent,
    UserFormComponent,
    HeaderComponent,
    AboutComponent,
    FilterUserListPipe,
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
