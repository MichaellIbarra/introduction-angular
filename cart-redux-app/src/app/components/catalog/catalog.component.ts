import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { products } from '../../data/product.data';
import { load } from '../../store/products.actions';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  private router = inject(Router);

  // @Input() products!: Product[];
  products!: Product[];

  private sharingDataService = inject(SharingDataService);

  private productService = inject(ProductService);

  private store = inject(Store<{ products: Product[]}>);

  constructor() {
    // diferencias entre ? y ! en typescript
    // ? : Indica que el valor puede ser nulo
    // ! : Indica que el valor no puede ser nulo|
    // if (this.router.getCurrentNavigation()?.extras.state) {
    //   this.products = this.router.getCurrentNavigation()?.extras.state!['products'];
    // }
    this.store.select('products').subscribe((state) => this.products = state.products )
  }

  ngOnInit(): void {
    this.store.dispatch(load());
      // this.products = this.productService.getProducts();
  }

  // @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();



  onAddCart($event: Product) {
    this.sharingDataService.productEventEmitter.emit($event);
  }
}
