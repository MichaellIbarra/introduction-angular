import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserComponent } from "../user/user.component";
import { UserFormComponent } from "../user-form/user-form.component";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

  title: string = 'List of Users';

  users: User[] = [];
  countId: number = 3;
  paginator: any = {};
  private userService = inject(UserService);
  private sharingDataService = inject(SharingDataService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  constructor() {
  }



  ngOnInit(): void {
    // this.userService.getUsers().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }


  pageUsersEvent() {
    this.sharingDataService.pageUsersEventEmitter.subscribe(pageable => {
      this.users = pageable.content;
      this.paginator = pageable.paginator;
    });
  }
findUserById(): void {
  this.sharingDataService.findUserByIdEventEmitter.subscribe(id => {
    // Si this.users no existe o está vacío, buscar el usuario directamente desde el servicio
    if (!this.users || this.users.length === 0) {
      console.log("XDDD");
      this.userService.findById(id).subscribe({
        next: (user) => {
          this.sharingDataService.selectedUserEventEmitter.emit(user);
        },
        error: (err) => {
          console.error('Error fetching user:', err);
          this.sharingDataService.selectedUserEventEmitter.emit(undefined);
        }
      });
    } else {
      // Si this.users existe, buscar localmente
      const user = this.users.find(user => user.id === id);
      this.sharingDataService.selectedUserEventEmitter.emit(user);
    }
  })
}

addUser() {
  this.sharingDataService.newUserEventEmitter.subscribe(user => {
    // Asegurar que this.users esté inicializado
    if (!this.users) {
      this.users = [];
    }

    if (user.id > 0) {
      this.userService.update(user).subscribe({
        next: userUpdated => {
          // Opción 1: Actualizar la lista si existe
          if (this.users && this.users.length > 0) {
            this.users = this.users.map(u => (u.id === user.id) ? { ...userUpdated } : u);
          } else {
            // Opción 2: Si no hay lista, crear una con el usuario actualizado
            this.users = [userUpdated];
          }
          
          this.router.navigate(['/users'], { 
            state: { 
              users: this.users, 
              paginator: this.paginator 
            } 
          });
          
          Swal.fire({
            title: "User edited!",
            text: "User saved successfully!",
            icon: "success"
          });
        },
        error: (err) => {
          if (err.status === 400) {
            this.sharingDataService.errorUserFormEventEmitter.emit(err.error);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user",
              icon: "error"
            });
          }
        }
      });
    } else {
      // Código para crear un nuevo usuario...
      this.userService.create(user).subscribe({
        next: userNew => {
          // Asegurar que this.users esté inicializado
          if (!this.users) {
            this.users = [];
          }
          
          this.users = [...this.users, { ...userNew }];
          
          this.router.navigate(['/users'], { 
            state: { 
              users: this.users, 
              paginator: this.paginator 
            } 
          });
          
          Swal.fire({
            title: "User saved!",
            text: "User saved successfully!",
            icon: "success"
          });
        },
        error: (err) => {
          if (err.status === 400) {
            this.sharingDataService.errorUserFormEventEmitter.emit(err.error);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to create user",
              icon: "error"
            });
          }
        }
      });
    }
  });
}

  removeUser(): void {
    this.sharingDataService.idUserEventEmitter.subscribe(idUser => {
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
          this.userService.remove(idUser).subscribe(() => {
             // Filtrar el usuario eliminado de la lista
             this.users = this.users.filter(user => user.id !== idUser);
            
             // Mostrar mensaje de éxito
             Swal.fire({
               title: "Deleted!",
               text: "User deleted successfully!",
               icon: "success"
             });
             
             // Navegar para refrescar la lista de usuarios
             this.router.navigate(['/users'], { 
               state: { 
                 users: this.users, 
                 paginator: this.paginator 
               } 
             });

          })

          Swal.fire({
            title: "Deleted!",
            text: "User deleted successfully!",
            icon: "success"
          });
        }
      });

    });

  }

  handlerLogin() {
    this.sharingDataService.handlerLoginEventEmitter.subscribe(({ username, password }) => {
      this.authService.loginUser(username, password).subscribe({
        next: response => {
          const token = response.token;
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.authService.token = token;
          this.authService.user = payload;
          this.router.navigate(['/users']);
        },
        error: err => {
          if (err.status == 401) {
            Swal.fire({
              title: "Error!",
              text: err.error.error,
              icon: "error"
            })
          } else {
            Swal.fire({
              title: "Error!",
              text: "An error occurred!",
              icon: "error"
            })
          }

        }
      });
    });
  }


}
