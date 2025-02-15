import { Component } from '@angular/core';

@Component({
  selector: 'app-loop',
  standalone: true,
  imports: [],
  templateUrl: './loop.component.html',
  styleUrl: './loop.component.css'
})
export class LoopComponent {

  task: string[] = [
    "Aprender Angular",
    "Aprender TypeScript",
    "Aprender Docker"
  ];

  addTask(newTask: string): void {
    if (newTask) {
      this.task.push(newTask);
    }
  }

}
