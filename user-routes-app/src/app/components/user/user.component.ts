import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() idUserEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output() selectedIdUserEventEmitter: EventEmitter<User> = new EventEmitter();

  onRemoveUser(idUser: number): void {
    // if (confirm("you want to delete this users?")) {
      this.idUserEventEmitter.emit(idUser);
    // }
  }

  onEditUser(user: User) {
    this.selectedIdUserEventEmitter.emit(user);
  }
    

}
