import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {

  @Input() url: string='';
  @Input() paginator: any = {};

  ngOnInit(): void {
      
  }
  
}
