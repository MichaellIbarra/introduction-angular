import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  @Input() items: CartItem[] = [];
  @Output() openEventEmitter = new EventEmitter();
  // @Input() total: number = 0;

  openCart() {
    this.openEventEmitter.emit();
  }

  onDeleteCart(id:number){
    this.idProductEventEmitter.emit(id);
  }

}
