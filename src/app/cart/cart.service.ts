import { Injectable, computed, signal } from "@angular/core";
import { Vehicle } from "../vehicles/vehicle";
import { CartItem } from "./cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  cartItems = signal<CartItem[]>([]);

  // Total up the extended price for each item
  subTotal = computed(() => this.cartItems().reduce((a,b)=>a + b.quantity * +b.vehicle.cost_in_credits,0));

  // Delivery is free if spending more than 100,000 credits
  deliveryFee = computed(() => this.subTotal()<100000 ?999:0);
  

  // Tax could be based on shipping address zip code
  tax = computed(() => Math.round(this.subTotal() * 10.75 / 100));
  

  // Total price
  totalPrice = computed(() => (this.subTotal() + this.deliveryFee() + this.tax()));

  // Add the vehicle to the cart as an Action<CartItem>
  addToCart(vehicle: Vehicle): void {
    const isAlreadyExist = this.cartItems().find(item => item.vehicle.name === vehicle.name);
    if(!isAlreadyExist) {
      this.cartItems.mutate(items => items.push({vehicle,quantity:1}))
    }else {
      this.cartItems.update(items => items.map(item => item.vehicle.name === vehicle.name? {...item,quantity : item.quantity + 1} : item ))
    }
  }

  // Remove the item from the cart
  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update(items => items.filter(item => item.vehicle.name !== cartItem.vehicle.name ))
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    this.cartItems.update(items => items.map(item => item.vehicle.name === cartItem.vehicle.name? {...item,quantity} : item ))
  }

  
}
