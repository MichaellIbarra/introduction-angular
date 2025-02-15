import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-view',
  standalone: true,
  imports: [],
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.css'
})
export class InvoiceViewComponent {

  @Input() id!:number;
  @Input() name!: string;
}
