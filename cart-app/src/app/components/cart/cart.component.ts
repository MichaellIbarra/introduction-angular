import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  // @Input() items: CartItem[] = [];
  // @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();
  items: CartItem[] = [];
  // @Input() total: number = 0;
  total: number = 0;
  private router = inject(Router);
  private sharingDataService = inject(SharingDataService);

  //  diferencia entre ngOnInit y constructor :
  //  ngOnInit se ejecuta despues del constructor y se ejecuta una sola vez
  ngOnInit(): void {
      
  }
  // constructor se ejecuta primero y se ejecuta una sola vez
  constructor(){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total= this.router.getCurrentNavigation()?.extras.state!['total'];

  }
// export class CartComponent implements OnChanges {



  // ngOnChanges(changes: SimpleChanges): void {
  //*   // changes.currentValue : Nos permite obtener el valor actual de la propiedad que estamos observando
  //*   // changes.previousValue : Nos permite obtener el valor anterior de la propiedad que estamos observando
  //*   // changes.firstChange : Nos permite saber si es la primera vez que se ejecuta el método ngOnChanges
  //*   // changes.isFirstChange() : Nos permite saber si es la primera vez que se ejecuta el método ngOnChanges
  //   let itemsChanges = changes['items'];
  //   this.onTotal();
  //   this.saveSession();
  // }

  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }



  onTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
