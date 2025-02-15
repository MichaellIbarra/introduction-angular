import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../../models/item';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.css'
})
export class FormItemComponent {


  @Output() addProductEventEmitter: EventEmitter<Item> = new EventEmitter();

  private counterId = 4;
  item: Item = {
    id: this.counterId,
    product: '',
    price: 0,
    quantity: 0
  }

  onSubmit(itemFrom: NgForm): void {
    if (itemFrom.valid) {
      this.addProductEventEmitter.emit(this.item);
      this.counterId++;
      this.item = {
        id: this.counterId,
        product: '',
        price: 0,
        quantity: 0
      };
      itemFrom.reset();
      itemFrom.resetForm();
    }
  }

}
