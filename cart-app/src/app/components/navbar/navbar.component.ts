import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  @Input() products: Product[] = [];
  
  // @Output() openEventEmitter = new EventEmitter();

  // openCart(): void {
  //   this.openEventEmitter.emit();
  // }



}
