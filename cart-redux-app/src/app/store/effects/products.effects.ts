import { inject, Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { findAll, load } from "../products.actions";
import { catchError, exhaustMap, map } from "rxjs";

@Injectable()
export class ProductsEffects{
    private actions$ = inject(Actions);
    private productService = inject(ProductService);

    loadProduct$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap( () => this.productService.getProducts())
        ).pipe(
            map( products => (findAll({ products}))),
            catchError( () => [])
        )
    );


}