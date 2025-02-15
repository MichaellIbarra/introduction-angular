import { Component } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-shop-online',
  standalone: true,
  imports: [],
  templateUrl: './shop-online.component.html',
  styleUrl: './shop-online.component.css'
})
export class ShopOnlineComponent {

  products:Product[] = [
    {description: 'Televisor', price: 999.99},
    {description: 'Celular', price: 999.99},
  ];

  addProduct(product: Product):void{
    if(product){
      this.products.push(product)
    }
  }

}
