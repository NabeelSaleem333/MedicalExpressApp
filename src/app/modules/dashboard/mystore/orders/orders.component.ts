import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { StoresService } from 'src/app/Services/store/stores.service';
import { Store } from 'src/app/models/schemas';
import { OrderService } from 'src/app/Services/order/order.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MessageService } from 'src/app/Services/message/message.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  // Counters
  ordertype = '';
  orders: Order;
  search: any;
  // tslint:disable-next-line: variable-name
  buyer_newCount = 0;
  // tslint:disable-next-line: variable-name
  buyer_cancelCount = 0;
  // tslint:disable-next-line: variable-name
  buyer_completeCount = 0;
  // Variables
  userId: string;
  // CONSTRUCTOR
  constructor(
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private orderServ: OrderService,
    private jwtServ: JwtService,
    private msgServ: MessageService,
  ) {}

  ngOnInit() {
    //
    this.userId = this.jwtServ.getUserId();
    this.getOrderList();
  }
  getOrderList() {
    this.orderServ.getOrder(this.userId).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.buyer_newCount = data.buyer_orders.new;
        this.buyer_cancelCount = data.buyer_orders.cancel;
        this.buyer_completeCount = data.buyer_orders.received;
        console.log(this.buyer_newCount, this.buyer_cancelCount, this.buyer_completeCount);
      } else {
        console.log('There is no order in the list');
      }
    });
  }
  closeFunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  saveSettings(evnet) {
    console.log('In My Orders: ', this.ordertype);
    this.orderServ
        .get_buyer_order_list(this.userId, this.ordertype)
        .subscribe((data) => {
            console.log(data);
            if (data.success) {
            // console.log(data.status);
            this.orders = data.buyer_orders;
            console.log(this.orders);
            this.msgServ.message(data.status);
          } else {
            this.msgServ.message(data.status);
          }
        });
  }

    /*  */
   cancelOrder(orderId: string, orderstatus: string) {
      this.orderServ.update_order_status(orderId, orderstatus).subscribe(data => {
          console.log(data);
          this.getOrderList();
          this.msgServ.message(data.status);
      });
    }
  /*  */
  receivedOrder(orderId: string, orderstatus: string) {
  this.orderServ.update_order_status(orderId, orderstatus).subscribe(data => {
      console.log(data);
      this.getOrderList();
      this.msgServ.message(data.status);
  });
  }
  /*
  This function is used to navigate to the orders
  list
 */
    navigateToOrderType(usertype: string, id: string) {
    this.router.navigate(['dashboard', 'mystore', 'orders', usertype, id]);
  }
  orderdetail(id: string) {
    this.router.navigate(['orders/orderdetail', id]);
  }
}

export class Order  {
  order: object;
  }
