import { Component, OnDestroy, OnInit } from '@angular/core';
import {User} from '../models/User.model'
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  public users:User[];
  public errorMessage: string;
  public idUser=null;
  private routeSubscription: Subscription;
  public searchText : any;
  /***********/
  constructor(
    private usersService:UsersService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    ){}
  /***********/

  ngOnInit(): void {
    this.usersService.getUsers().then(
      (users:User[]) => {
        if (users===null) {
          console.log("Erreur à la lecture des utilisateurs");
        } else {
          this.users=users;
        }
      }, (error) => {this.errorMessage = this.authService.getErrorMessage(error);}    
    );
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      this.idUser = routeParams.id;
    });
  
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onViewUser(id:number) {
    this.router.navigate(['/users','view',id]);    
  }


}
