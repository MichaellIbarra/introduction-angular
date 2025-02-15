import { Component } from '@angular/core';
import { ChildComponent } from "./child/child.component";

@Component({
  selector: 'app-father',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './father.component.html',
  styleUrl: './father.component.css'
})
export class FatherComponent {

  subtitle: string = 'Subtitle from Father Component';
  childTitle!: string;

  updateChildTitle(newTitle: string) {
    this.childTitle = newTitle;
  }
}
