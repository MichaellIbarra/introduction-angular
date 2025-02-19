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

  // products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  isShowCart: boolean = false;

  private productService = inject(ProductService);

  ngOnInit(): void {
    // this.products = this.productService.getProducts();
    this.getSession();
    this.onTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product: Product) => {
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
      this.onTotal();
      this.saveSession();
      this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });

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
          this.items = this.items.filter(item => item.product.id !== id);
          if (this.items.length === 0) {
            sessionStorage.removeItem('cart');
          }
          this.onTotal();
          this.saveSession();
          // skipLocationChange: true : Evita que se guarde la ruta en el historial del navegador
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });
          });

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
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  getSession(): void {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    }
  }

  openCart(): void {
    this.isShowCart = !this.isShowCart;
  }
}
