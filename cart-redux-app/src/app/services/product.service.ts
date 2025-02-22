import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]>{
    return of(products);
  }

}
