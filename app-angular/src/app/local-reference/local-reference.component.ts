import { Component } from '@angular/core';

@Component({
  selector: 'app-local-reference',
  standalone: true,
  imports: [],
  templateUrl: './local-reference.component.html',
  styleUrl: './local-reference.component.css'
})
export class LocalReferenceComponent {

  task: string = '';

  addTask(task: string):void{
    this.task = task;
  }

}
