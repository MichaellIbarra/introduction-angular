import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolation',
  standalone: true,
  imports: [],
  templateUrl: './interpolation.component.html',
  styleUrl: './interpolation.component.css'
})
export class InterpolationComponent {
  title = 'Interpolation';
  user = {
    name: 'Matichelo I.',
    age: 19
  }

  greet(){
    return `Hi, ${this.user.name}!`;
  }
  
}
