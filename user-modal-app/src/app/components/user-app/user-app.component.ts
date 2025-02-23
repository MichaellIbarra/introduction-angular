import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserComponent } from "../user/user.component";
import { UserFormComponent } from "../user-form/user-form.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

  title: string = 'List of Users';

  users: User[] = [];
  countId: number = 3;
  userSelect: User;
  open: boolean = false;
  

  constructor() {
    this.userSelect = new User();
  }

  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  addUser(user: User) {
    if (user.id > 0) {
      this.users = this.users.map(users => (users.id === user.id) ? { ...user } : users);
    } else {
      this.users = [...this.users, { ...user, id: this.countId++ }];
    }
    Swal.fire({
      title: "User saved!",
      text: "User saved successfully!",
      icon: "success"
    });
    this.userSelect = new User();
    this.open = false;
  }

  removeUser(idUser: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(users => users.id !== idUser);
        Swal.fire({
          title: "Deleted!",
          text: "User deleted successfully!",
          icon: "success"
        });
      }
    });
  }

  setSelectUser(user: User): void {
    this.userSelect = { ...user };
    this.open = true;
  }

  setOpen(){
    this.open = !this.open;
    if(this.open == false){
      this.userSelect = new User();
    }
  }
}
