import { Component } from '@angular/core';

@Component({
  selector: 'app-encapsulation',
  standalone: true,
  imports: [],
  templateUrl: './encapsulation.component.html',
  styleUrl: './encapsulation.component.css'
})
export class EncapsulationComponent {
  private name = 'Encapsulation';

  // getter in TypeScript
  get showName(){
    return this.name;
  }

  getName(){
    return this.name;
  }

}
