import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  //  atributo selector.
  selector: 'div[app-product-card]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: Product;


  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();
  onAddCart(product: Product) {
    this.productEventEmitter.emit(product);
  }


}
