import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {


  @Input() products!: Product[];

  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();


  onAddCart($event: Product) {
    this.productEventEmitter.emit($event);
    }
}
