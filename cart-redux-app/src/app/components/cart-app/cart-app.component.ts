import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CatalogComponent } from "../catalog/catalog.component";
import { CartItem } from '../../models/cartItem';
import { CartComponent } from "../cart/cart.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CardModalComponent } from "../card-modal/card-modal.component";
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { query } from '@angular/animations';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { add, remove, total } from '../../store/items.actions';
import { ItemsState } from '../../store/items.reducer';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {

  private router = inject(Router);
  private sharingDataService = inject(SharingDataService);
  private store = inject(Store<{ items: ItemsState}>);

  // products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  isShowCart: boolean = false;

  private productService = inject(ProductService);

  constructor(){
    this.store.select('items').subscribe( state => {
      this.items = state.items;
      this.total = state.total
      this.saveSession();
      console.log("Cambio de estado");
    })
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product: Product) => {
      this.store.dispatch(add({ product }));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);

      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto agregado al carrito",
        icon: "success"
      });

    });


  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id: number) => {

      Swal.fire({
        title: "Esta seguro que deseas eliminar?",
        text: "Cuidado el item se eliminará del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito del compras.",
            icon: "success"
          });


        }
      });




    })


  }

  onTotal(): void {
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  // getSession(): void {
  //   const cart = sessionStorage.getItem('cart');
  //   if (cart) {
  //     this.items = JSON.parse(cart);
  //   }
  // }

  openCart(): void {
    this.isShowCart = !this.isShowCart;
  }
}
