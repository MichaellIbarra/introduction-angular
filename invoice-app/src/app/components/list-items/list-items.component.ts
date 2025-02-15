import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RowItemComponent } from "../row-item/row-item.component";
import { Item } from '../../models/item';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [RowItemComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {


  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter();

  onRemove(productId: number) {
    this.removeEventEmitter.emit(productId);
  }

  @Input() products!: Item[];
}
