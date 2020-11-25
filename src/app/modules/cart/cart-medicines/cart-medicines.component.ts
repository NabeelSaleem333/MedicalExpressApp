import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { OrderbillComponent } from './orderbill/orderbill.component';
import { CartB } from 'src/app/models/schemas';

@Component({
  selector: 'app-cart-medicines',
  templateUrl: './cart-medicines.component.html',
  styleUrls: ['./cart-medicines.component.scss'],
})
export class CartMedicinesComponent implements OnInit {
  // Variables
  storename: '';
  userId: string;
  storeId: string;
  onselect = 'all';
  // COUNTERS
  counter = 0;
  // ARRAYS
  cart: CartB[];
  search: any;
  //

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastController,
    private alert: AlertController,
    private modalController: ModalController,
    public cartServ: CartService,
    public jwtServ: JwtService
  ) {}

  ngOnInit() {
    this.userId = this.jwtServ.getUserId();
    this.route.params.subscribe((param) => {
      this.storename = param.storename;
      this.storeId = param.storeId;
      this.getCartMedicinesOnStore(this.storeId);
    });
  }
  /*
A function to get the all the medicines in a of
one relevant store
*/
  getCartMedicinesOnStore(storeId: string) {
    this.cartServ.loadCartForOneStore(storeId).subscribe((data) => {
      console.log(data);
      if (data) {
        this.cart = data;
        this.counter = data.length;
      } else {
        this.counter = 0;
      }
    });
  }

// The method 'onKeyUp()' is used to Search Medicine from the Medicine List
onKeyUp(event: any) {
  console.log(event.target.value);
  this.search = event.target.value;
  if (event.target.value !== '') {
    this.cart = this.cart.filter(
      (res) => {
        return (res.medicinename + res.formula)
          .toLocaleLowerCase()
          .match(this.search.toLocaleLowerCase());
      }
    );
  } else {
    this.getCartMedicinesOnStore(this.storeId);
  }
} // End of the 'onKeyUp()' method

  onSelect(event: any) {
    console.log(event.target.value);
    this.onselect = event.target.value;
  }
 /*
  Generate alert to Update
  The Medicine Quantity
   */
  async addQuantity(cartId: string, cartname: string) {
    console.log(cartId);
    await (
      await this.alert.create({
        header: cartname + ' Quantity',
        message: 'limit (1-10)',
        inputs: [
          {
            name: 'quantity',
            type: 'number',
            placeholder: 'Enter quantity',
          },
        ],
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: (alertdata) => {
              if (alertdata.quantity < 1) {
                console.log('Must be > 0');
                this.addQuantity(cartId, cartname);
              } else if (alertdata.quantity > 10) {
                console.log('Must be < 2 digits');
                this.addQuantity(cartId, cartname);
              } else {
                console.log(alertdata.quantity);
                const cart = {
                  quantity: alertdata.quantity,
                };
                this.cartServ.updateCart(cartId, cart).subscribe((data) => {
                  console.log(cartname + 'Information updated');
                  console.log(data);
                  this.message('Medicine ' + cartname + ' Updated');
                  this.getCartMedicinesOnStore(this.storeId);
                });
                return (this.cartServ.cart = alertdata.quantity);
              }
            },
          },
        ],
      })
    ).present();
  }





  /*
  Alert to remove the medicine
  from cart
 */
  async removeAlert(cartId: string, name: string) {
    // console.log(storeId);
    await (
      await this.alert.create({
        header: name,
        message: 'Are you sure to delete?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: (alertdata) => {
              this.deleteOneMedicineCart(cartId, name);
            },
          },
        ],
      })
    ).present();
  }
  /* A function to delete only one medicine from the cart */
  deleteOneMedicineCart(cartId: string, name: string) {
    this.cartServ.removeOneMedicineCart(cartId).subscribe(
      (data) => {
        if (data) {
          this.message(name + ' deleted successfully');
          this.getCartMedicinesOnStore(this.storeId);
        } else {
          this.message(name + 'not found to  delete');
        }
      },
      (err) => console.log(err)
    );
  }
  /*
  Modal Controller to generate the bill in
  the popup
  */
  async checkout(storeId: string, cart: CartB[]) {
    // console.log(this.storeId);
    const modal = await this.modalController.create({
      component: OrderbillComponent,
      componentProps: {storeId, cart}
    });
    await modal.present();
  }

  //
  /* Present an appropriate message to the user */
  async message(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 2000,
    });
    await t.present();
  }
  /* Navigate to the medicines */
  navigateToMedicines() {
    this.router.navigate(['medicines']);
  }
}

// export class Cart {
//   // tslint:disable-next-line: variable-name
//   _id: string; // cartId
//   medicineId: string;
//   medicinename: string;
//   formula: string;
//   format: string;
//   ingredients: number;
//   quantity: number;
//   price: number;
// }
