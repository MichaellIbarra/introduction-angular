import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'tr[app-row-item]',
  standalone: true,
  imports: [],
  templateUrl: './row-item.component.html',
  styleUrl: './row-item.component.css'
})
export class RowItemComponent {

  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter();


  onRemove(idProduct: number) {
    this.removeEventEmitter.emit(idProduct);
  }

  @Input() product!: Item;

}
