import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit, OnDestroy {
  public user: User = null;
  public errorMessage: string;
  private routeSubscription: Subscription;
  /***********/
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router,
    private authService: AuthService,
  ) { }
  /***********/

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      if (routeParams.id != null) {
        this.userService.getUserById(routeParams.id).then(
          (user: User) => {
            if (user === null) {
              console.log("Erreur à la lecture de l'utilisateur " + routeParams.id);
              this.router.navigate(['/users']);
            } else {
              this.user = user;
            }
          }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
        );
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onBack() {
    this.router.navigate(['/users']);
  }
  
  onNewUser() {
    this.router.navigate(['/users','new']);    
  }

  onDeleteUser() {
    this.userService.removeUser(this.user).then(
      (any: any) => {
        if (any === null) {
          console.log("Erreur à la suppression de l'utilisateur " + this.user.id);
        } else {
          this.router.navigate(['/users']);
        }
      }, (error) => { this.errorMessage = this.authService.getErrorMessage(error); }
    );
  }

  onModify() {
    this.router.navigate(['/users', 'edit', this.user.id]);
  }

}
