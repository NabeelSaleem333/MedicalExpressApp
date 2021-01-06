import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Services/order/order.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss'],
})
export class OrderdetailComponent implements OnInit {
  orderId: string;
  order: Order;
  flag = false;
  constructor(
    private orderServ: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.orderId = param.id;
      console.log(this.orderId);
    });
    this.getOrderDetail();
  }
  getOrderDetail(){
    this.orderServ.get_single_order(this.orderId).subscribe(data => {
      console.log(data);
      this.flag = true;
      this.order = data.order;

    });
  }
}

export class Order{
  order: object;
}
