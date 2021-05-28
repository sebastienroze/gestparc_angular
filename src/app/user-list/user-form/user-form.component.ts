import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/Role.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;
  public errorMessage: string;
  public userid = -1;
  public roles:Role[] = null;
  private user : User = null;
  private waitUser = false;
  /***********/
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private roleService: RolesService,
    private authService: AuthService,
    private router: Router,
    ){}
  /***********/
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.roleService.getRoles().then(
      (roles:Role[]) => {
      this.setRoles(roles);
      }, (error) => {this.errorMessage = this.authService.getErrorMessage(error);}    
    );    

    if (id !=undefined) {
      this.userid = id;    
      this.userService.getUserById(id).then(
        (user: User) => {
          if (user === null) {
            console.log("Erreur à la lecture de l'utilisateur ");
          } else {
            this.setUser(user);          
            console.log(user);
          }
        }, (error) => {this.errorMessage = this.authService.getErrorMessage(error);}    
      );
    }  
    this.initForm();    
  }

  setUser(user:User) {
    this.user = user;
    if (this.roles != null) {
      this.setFormControlUser();
    } else this.waitUser = true;

  }
  setRoles(roles : Role[]) {
    this.roles = roles;
    for (let i = 0;i< this.roles.length;i++) {            
      this.userForm.addControl("role_"+this.roles[i].id, new FormControl('', Validators.nullValidator));
    }
    if (this.waitUser)  this.setFormControlUser();
   }

  setFormControlUser() {
    this.userForm.patchValue({
      login:this.user.login,
      nom:this.user.nom,
      prenom:this.user.prenom,
      cp:this.user.cp,
      ville:this.user.ville,
      telephone:this.user.telephone,
      email:this.user.email,
//      password:this.user.password, 
    });
    for (let i = 0;i< this.user.listeRole.length;i++) {            
      const objRole = {};
      objRole["role_"+this.user.listeRole[i].id] = true;
      this.userForm.patchValue(objRole);
    }
  }

  initForm() {
    let passwordValidator:Validators;

    if (this.userid ==-1) {
      passwordValidator = Validators.required;
    } else {
      passwordValidator = Validators.nullValidator;
    }
    this.userForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', passwordValidator],
      nom:['',Validators.nullValidator],
      prenom:['',Validators.nullValidator],
      cp:['',Validators.nullValidator],
      ville:['',Validators.nullValidator],
      telephone:['',Validators.nullValidator],
      email:['',Validators.nullValidator],
    })

  }

  onBack() {
    if (this.userid>=0) {
      console.log("navigate "+this.userid);
      this.router.navigate(['/users','view',this.userid]);
    } else {
      this.router.navigate(['/users']);
    }
  }

  onSaveUser() {
    const login = this.userForm.get('login').value;
    const password = this.userForm.get('password').value;
    const userRoles:Role[] = [];
    const id = -1;
    for (let i = 0;i< this.roles.length;i++) {      
      console.log(this.userForm.get('role_'+this.roles[i].id).value);
      if (this.userForm.get('role_'+this.roles[i].id).value == true) {
        userRoles.push(new Role(this.roles[i].id,""));
      }
    }
    const anUser = new User(this.userid,login,password,userRoles);
    anUser.nom = this.userForm.get('nom').value;
    anUser.prenom = this.userForm.get('prenom').value;
    anUser.cp = this.userForm.get('cp').value;
    anUser.ville = this.userForm.get('ville').value;
    anUser.telephone = this.userForm.get('telephone').value;
    anUser.email = this.userForm.get('email').value;
    if (this.userid==-1) { // Création 
      this.userService.createNewUser(anUser).then (
        (user: User) => {
          if (user === null) {
            console.log("Erreur à la création de l'utilisateur ");
          } else {
//            console.log(user);
//            this.router.navigate(['/users','view',id]);
              this.router.navigate(['/users']);
          }          
        }, (error) => {this.errorMessage = this.authService.getErrorMessage(error);}    
      );
    } else { // mise à jour
      this.userService.UpdateUser(anUser).then(
        (user: User) => {
          if (user === null) {
            console.log("Erreur modification de l'utilisateur ");
          } else {
            this.router.navigate(['/users','view',user]);
          }
        }, (error) => {this.errorMessage = this.authService.getErrorMessage(error);}    
      );
    }
  }  
}
