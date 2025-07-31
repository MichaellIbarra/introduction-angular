import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  // diferencias entre ActivatedRoute y Router: ActivatedRoute es un servicio que contiene información sobre una ruta asociada con un componente que se carga en una salida de enrutador, mientras que Router es un servicio que permite la navegación de una vista a otra según la URL del navegador.
  private routeActivated = inject(ActivatedRoute);
  private sharingDataService = inject(SharingDataService);
  private router = inject(Router);
  private userService = inject(UserService);

  user: User = new User();
  erros:any = {};

  constructor() {
    // this.sharingDataService.selectedUserEventEmitter.subscribe(user => this.user = user);



    // if(this.router.getCurrentNavigation()?.extras.state){
    // this.user =this.router.getCurrentNavigation()?.extras.state!['user'];
    // }
  }
  ngOnInit(): void {
    this.sharingDataService.errorUserFormEventEmitter.subscribe(erros => this.erros = erros);
    this.sharingDataService.selectedUserEventEmitter.subscribe(user => this.user = user);

    this.routeActivated.paramMap.subscribe( params => {
      const id: number = +(params.get('id') || 0);
      if(id > 0){
        this.sharingDataService.findUserByIdEventEmitter.emit(id);
        // this.userService.findById(id).subscribe(
        //   user => this.user = user
        // )
      }
    });
  }

  onSubmit(userForm: NgForm) {
      this.sharingDataService.newUserEventEmitter.emit(this.user);
      // this.onclear(userForm);
  } 

  onclear(userForm: NgForm) {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }


}
