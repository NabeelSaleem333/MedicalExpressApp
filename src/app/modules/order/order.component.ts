import { Component, OnInit, Input } from '@angular/core';
import { StoresService } from 'src/app/Services/store/stores.service';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine, StoreMedicine } from 'src/app/models/schemas';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  imageurl = 'assets/images/MartialKing.PNG';
  // Flags
  close = true;
  flag1 = false;
  mflag = false;
  internetflag = true;
  // Variables
  @Input()
  medicine: StoreMedicine;
  storeName: string;

  TotalAmount: number;
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.close = true;
    console.log('Order Component');
    console.log(this.medicine);
    this.TotalAmount = this.medicine.price;
  }

  onKeyUp(event: any, price: number) {
    console.log(event.target.value * price);
    if ((event.target.value * price ) === 0) {
      this.TotalAmount = this.medicine.price;
    } else {
      this.TotalAmount = event.target.value * price;
    }
  }
  //
  closeOrder() {
    this.modalController.dismiss();
  }
/*
################################
Navigator
*/
navigateToStores() {
this.router.navigate(['stores']);
}

}
