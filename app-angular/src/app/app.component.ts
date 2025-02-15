import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterpolationComponent } from "./interpolation/interpolation.component";
import { FatherComponent } from "./father/father.component";
import { EncapsulationComponent } from "./encapsulation/encapsulation.component";
import { EventBindingComponent } from "./event-binding/event-binding.component";
import { PropertyBindingComponent } from "./property-binding/property-binding.component";
import { TwoWayBindingComponent } from "./two-way-binding/two-way-binding.component";
import { CalculatorComponent } from "./calculator/calculator.component";
import { ConditionalComponent } from "./conditional/conditional.component";
import { LocalReferenceComponent } from "./local-reference/local-reference.component";
import { LoopComponent } from "./loop/loop.component";
import { ShopOnlineComponent } from "./shop-online/shop-online.component";
import { ExampleDirectiveComponent } from "./example-directive/example-directive.component";
import { LocalstorageSessionstorageComponent } from "./localstorage-sessionstorage/localstorage-sessionstorage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InterpolationComponent, FatherComponent, EncapsulationComponent, EventBindingComponent, PropertyBindingComponent, TwoWayBindingComponent, CalculatorComponent, ConditionalComponent, LocalReferenceComponent, LoopComponent, ShopOnlineComponent, ExampleDirectiveComponent, LocalstorageSessionstorageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-angular';
}
