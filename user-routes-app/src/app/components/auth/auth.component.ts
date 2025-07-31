import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user: User;

  private sharingDataService = inject(SharingDataService);

  constructor(){
    this.user = new User();
  }


  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error',
        'Username and password are required',
        'error'
      );
    }else {
      this.sharingDataService.handlerLoginEventEmitter.emit(this.user);
    }
  }

}
