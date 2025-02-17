import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CatalogComponent } from "../catalog/catalog.component";
import { CartItem } from '../../models/cartItem';
import { CartComponent } from "../cart/cart.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CardModalComponent } from "../card-modal/card-modal.component";

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent, NavbarComponent, CardModalComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {


  products: Product[] = [];

  items: CartItem[] = [];

  // total:number = 0;

  isShowCart: boolean = false;

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.getSession();
    // this.onTotal();
  }

  onAddCart(product: Product):void {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item;
      })
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    // this.onTotal();
    // this.saveSession();
  }

  onDeleteCart(id: number):void {
    this.items = this.items.filter(item => item.product.id !== id);
    if(this.items.length === 0){
      sessionStorage.removeItem('cart');
    }
    // this.onTotal();
    // this.saveSession();
  }

  // onTotal(): void{
  //   this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0); 
  // }

  // saveSession(): void{
  //   sessionStorage.setItem('cart', JSON.stringify(this.items));
  // }

  getSession(): void{
    const cart = sessionStorage.getItem('cart');
    if (cart){
      this.items = JSON.parse(cart);
    }
  }

  openCart(): void{
    this.isShowCart = !this.isShowCart;
  }
}
