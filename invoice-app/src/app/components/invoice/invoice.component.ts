import { Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/Invoice.service';
import { Invoice } from '../../models/invoice';
import { InvoiceViewComponent } from "../invoice-view/invoice-view.component";
import { ClientViewComponent } from "../client-view/client-view.component";
import { CompanyViewComponent } from "../company-view/company-view.component";
import { ListItemsComponent } from "../list-items/list-items.component";
import { TotalViewComponent } from "../total-view/total-view.component";
import { FormItemComponent } from "../form-item/form-item.component";
import { Item } from '../../models/item';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [InvoiceViewComponent, ClientViewComponent, CompanyViewComponent, ListItemsComponent, TotalViewComponent, FormItemComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

  private invoiceService = inject(InvoiceService);



  invoice!: Invoice;


  ngOnInit(): void {
    this.invoice = this.invoiceService.getInvoice();
  }

  onRemove(id: number) {
    this.invoice = this.invoiceService.removeItem(id);
  }

  addProduct($event: Item) {
    this.invoice = this.invoiceService.addItem($event);
  }
  constructor() { }

}
