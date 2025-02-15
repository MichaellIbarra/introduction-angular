import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-example-directive',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './example-directive.component.html',
  styleUrl: './example-directive.component.css'
})
export class ExampleDirectiveComponent {

  users:string[]= ['John', 'Doe', 'Smith', 'Alex', 'Sam'];

  isVisibility = true;
  title= 'Example Directive';

  setVisibility() {
    this.isVisibility = !this.isVisibility;
  }

}
