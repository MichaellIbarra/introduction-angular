import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authServcie = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @Input() users: User[] = [];
  @Input() paginator = {};

  get isAuthenticated(): boolean{
    return this.authServcie.isAuthenticated();
  }

  get isAdmin(): boolean{
    return this.authServcie.isAdmin();
  }

  handlerLogout(): void {
    this.authServcie.logout();
    this.router.navigate(['/']);
    this.cdr.detectChanges();
  }
  
}
