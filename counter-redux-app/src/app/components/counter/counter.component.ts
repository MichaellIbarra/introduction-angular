import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../../store/items.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  title: string = 'Counter usando Redux';
  counter: number = 0;

  private store = inject(Store<{ counter: number}>);

  constructor(){
    this.store.select('counter').subscribe((counter) => {
      this.counter = counter;
    })
  }

  increment(): void {
    this.store.dispatch(increment({ add: 2}));
    // this.counter++;
  }

  decrement(): void {
    if(this.counter > 0){
      this.store.dispatch(decrement());
    }
  }

  reset(): void{
    this.store.dispatch(reset());
    // this.counter = 0;
  }

}
