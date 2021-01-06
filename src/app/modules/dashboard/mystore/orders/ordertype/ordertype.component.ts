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
  selector: 'app-ordertype',
  templateUrl: './ordertype.component.html',
  styleUrls: ['./ordertype.component.scss'],
})
export class OrdertypeComponent implements OnInit {
  usertype: string;
  userId: string;
  storeId: string;
    // Counters
    ordertype = '';
    // orders: Order;
    search: any;
    // tslint:disable-next-line: variable-name
    buyer_newCount = 0;
    // tslint:disable-next-line: variable-name
    buyer_cancelCount = 0;
    // tslint:disable-next-line: variable-name
    buyer_completeCount = 0;
  // OBJECT
  orders: Orders[];
  // CONSTRUCTOR
  constructor(
    public orderServ: OrderService,
    private jwtServ: JwtService,
    private msgServ: MessageService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.storeId = params.storeId;
    });
    this.getOrderList();
    // console.log(this.store);
  }

  /* Get orders list according to the */
  getOrderList() {
    this.orderServ.getOrder(this.storeId).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.buyer_newCount = data.seller_orders.new;
        this.buyer_cancelCount = data.seller_orders.cancel;
        this.buyer_completeCount = data.seller_orders.complete;
        console.log(this.buyer_newCount, this.buyer_cancelCount, this.buyer_completeCount);
      } else {
        console.log('There is no order in the list');
      }
    });
  }

  saveSettings(evnet) {
    console.log('In My Orders: ', this.ordertype);
    this.orderServ
        .get_seller_order_list(this.storeId, this.ordertype)
        .subscribe((data) => {
            console.log(data);
            if (data.success) {
            // console.log(data.status);
            this.orders = data.seller_orders;
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
  /*  */
  closeFunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  orderdetail(id: string) {
    this.router.navigate(['orders/orderdetail', id]);
  }
}

export class Orders  {
order: object;
}
