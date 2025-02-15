import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  standalone: true,
  imports: [],
  templateUrl: './property-binding.component.html',
  styleUrl: './property-binding.component.css'
})
export class PropertyBindingComponent {

  text: string = '';

  updateText(event: Event) {
    const elementInput = event.target as HTMLInputElement;
    this.text = elementInput.value;
  }

}
