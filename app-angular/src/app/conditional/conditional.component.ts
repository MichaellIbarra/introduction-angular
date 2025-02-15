import { Component } from '@angular/core';

@Component({
  selector: 'app-conditional',
  standalone: true,
  imports: [],
  templateUrl: './conditional.component.html',
  styleUrl: './conditional.component.css'
})
export class ConditionalComponent {
  isAuthentication: boolean = false;

  alternateAuthentication() {
    this.isAuthentication = !this.isAuthentication;
  }

}
