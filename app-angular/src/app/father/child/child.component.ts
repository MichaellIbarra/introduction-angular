import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnInit {
  @Input() title!: string;

  @Output() subTitleEmmit: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.subTitleEmmit.emit('Subtitle from Child Component');
  }

}
