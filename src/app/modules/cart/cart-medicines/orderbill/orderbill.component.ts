import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoresService } from 'src/app/Services/store/stores.service';
import { CartB } from 'src/app/models/schemas';
import { JwtService } from 'src/app/core/services/jwt.service';
import { OrderService } from 'src/app/Services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderbill',
  templateUrl: './orderbill.component.html',
  styleUrls: ['./orderbill.component.scss'],
})
export class OrderbillComponent implements OnInit {
  // Flags
  loadflag = false;
  // Variables
  date = Date.now();
  subtotal = 0;
  charges = 0;
  discount = 0;
  total = 0;
  // Counters
  // Objects
    // OBJECTS
    order: Order;
    medicine: Medicine;
  // Arrays
  @Input()
  storeId: string;
  @Input()
  cart: CartB[];
  constructor(
    public storeServ: StoresService,
    private modalController: ModalController,
    private jwtServ: JwtService,
    public orderServ: OrderService,
    private router: Router,
    ) {}

  ngOnInit() {
    console.log(this.storeId);
    console.log(this.cart);
    for (const c of this.cart) {
      this.subtotal += c.price * c.quantity;
    }
    this.total += this.subtotal;
    this.getStoreDetail();
  }

  /*
  A function to get the store details
   */
  getStoreDetail() {
    this.storeServ.getStoreById(this.storeId).subscribe(
      (data) => {
        console.log(data);
        this.loadflag = true;
        this.storeServ.store = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /*
  A function to done the order
  */
 /* A function to final the order */
 checkOut() {
  // tslint:disable-next-line: prefer-const
  // let array = [];
  // let count = 0;
  // for (const m of this.cart) {
  //   array[count] = {
  //     medicineId: m.medicineId,
  //     price: m.price,
  //     quantity: m.quantity,
  //   };
  //   count += 1;
  // }

  this.order = {
    userId: this.jwtServ.getUserId(),
    storeId: this.storeId,
    medicines: this.cart,
    amountpaid: 2000,
    paymentmethod: 'cash',
    orderstatus: 'new'
  };
  console.log(this.order);
  this.orderServ.placeOrder(this.order).subscribe(data => {
    console.log(data);
  });
  this.closeFunc();
  // navigateToMedicines() {
  this.router.navigate(['cart']);
  // }
}
  /*
  A function to close the orderbill component
  */
  closeFunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}


// Classes
export class Medicine {
  medicineId: string;
  price: number;
  quantity: number;
}

export class Order {
    userId: string;
    storeId: string;
    medicines: Array<any>;
    amountpaid: number;
    paymentmethod: string;
    orderstatus: string;
}
