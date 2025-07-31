import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { state } from '@angular/animations';
import { PaginatorComponent } from "../paginator/paginator.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterModule,
    PaginatorComponent
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  title: string = 'List of Users';

  users: User[] = [];

  paginator: any = {};



  private sharingDataService = inject(SharingDataService);
  private router = inject(Router);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  constructor() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }

  }

  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length === 0) {
      console.log("holaaa");
      this.activatedRoute.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.userService.getUsersPage(page).subscribe(pageable => {
          this.users = pageable.content;
          this.paginator = pageable;
          this.sharingDataService.pageUsersEventEmitter.emit({ users: this.users, paginator: this.paginator });
        });
      })
    }
  }


  onRemoveUser(idUser: number): void {
    this.sharingDataService.idUserEventEmitter.emit(idUser);
  }

  onEditUser(user: User) {
    // this.sharingDataService.selectedIdUserEventEmitter.emit(user);
    this.router.navigate(['/users/edit', user.id]);
  }


  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isUser(): boolean {
    return this.authService.isUser();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
