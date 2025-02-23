import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {


  @Input() user: User;
  @Output() openEventEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() { 
    this.user = new User();
  }

  onSubmit(userForm:NgForm){
    if(userForm.valid){
    this.newUserEventEmitter.emit(this.user);
    this.onclear(userForm);
    }
  }

  onclear(userForm:NgForm) {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  onOpen(){
    this.openEventEmitter.emit();
  }

}
