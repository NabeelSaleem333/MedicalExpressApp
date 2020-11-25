import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { StoresService } from 'src/app/Services/store/stores.service';
import { StoreMedicine } from 'src/app/models/schemas';
import { CartService } from 'src/app/Services/cart/cart.service';
import { OrderComponent } from '../../order/order.component';
import { JwtService } from 'src/app/core/services/jwt.service';
import { AuthComponent } from 'src/app/auth/auth.component';
import * as jwt_token from 'jwt-decode';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
})
export class VisitComponent implements OnInit {
  imageurl = 'assets/images/MartialKing.PNG';
  // Flags
  switch = true;
  flag1 = false;
  mflag = false;
  internetflag = true;
  searchflag = false;
  orderflag = false;
  // Variables
  currentUserId: string;
  qty: number;
  // tslint:disable-next-line: variable-name
  userId: string;
  // tslint:disable-next-line: variable-name
  store_id: string;
  cartCounter = 0;
  // tslint:disable-next-line: variable-name
  orderMedicine: StoreMedicine; // This is used with orderComponent
  onselect = 'all';
  search: any;

  //
  constructor(
    public storeServ: StoresService,
    public medicineServ: MedicineService,
    private cartServ: CartService,
    private jwtServ: JwtService,
    private toastController: ToastController,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertController
  ) {}

  ngOnInit() {
    // we are getting the user information
    // from the token
    this.currentUserId  = this.jwtServ.getUserId();
    console.log(this.currentUserId);
    this.getStore();
    this.loadCart();
  }

  /*
This Function is used to get
One Store Record
*/
  getStore() {
    this.route.params.subscribe((params) => {
      this.userId = params.id; // User Id
      console.log(this.userId);
      this.storeServ.getStoreById(this.userId).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.storeServ.store = data;
            this.flag1 = true;
            this.store_id = this.storeServ.store._id; // get store_id to get store medicines
            this.getMedicines(); // Load Medicines Related to store
            this.loadCart();
          } else {
          }
        },
        (err) => {
          this.internetflag = false;
          this.presentToast('Internet Error');
        }
      );
    });
  }
  getMedicines() {
    this.medicineServ.getMedicinesByStoreId(this.store_id).subscribe(
      (data) => {
        if (data.success) {
          // this.presentToast('All Medicines Found');
          console.log(data);
          this.medicineServ.storeMedicineArray = data.array;
          this.mflag = true;
        }
      },
      (err) => {
        console.log('Invalid Url');
      }
    );
  }

  /*
  This function is used to set the value in
  order componnet to show ordered medicine
  details
  */
  orderFunc(mObject: StoreMedicine) {
    this.orderMedicine = mObject;
    this.orderflag = true;
  }

  showCart() {
    this.router.navigate(['cart']);
  }

  /*
  This function is used to add medicine
  to the cart of the user
  */

  loadCart() {
    this.cartServ.cartCounter(this.currentUserId).subscribe(
      (data) => {
        if (data) {
          console.log(data);
          // this.cartServ.cartArray = data;
          this.cartCounter = data;
        } else {
          console.log(data);
          this.presentToast('Cart is Empty!');
          // this.inCart = data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /*
   */
  cartFunc(mId: string) {
    console.log(this.qty);
    this.cartServ.cart = {
      userId: this.currentUserId,
      storeId: this.store_id,
      medicineId: mId,
      quantity: 1,
    };
    // this.addQuantity();
    if (this.cartCounter < 10) {
      this.cartServ.addToCart(this.cartServ.cart).subscribe(
        (data) => {
          if (data) {
            console.log(data);
            // this.cartCounter = data;
            this.loadCart();
            this.presentToast('Medicine added In Cart');
          } else {
            console.log(data);
            this.presentToast('Medicine Already In Cart');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.presentToast('Your cart is full');
    }
  }
  //

  /*
   This a order function
   a popup will open which will show the user to
   place a order
   */

  async openOrderModalController(medicine: StoreMedicine, storeName: string) {
    if (this.jwtServ.getToken()) {
      console.log(medicine);
      const modal = await this.modalController.create({
        component: OrderComponent,
        componentProps: { medicine, storeName },
      });
      modal.onDidDismiss().then((data) => {});
      await modal.present();
      // else {
      //   this.router.navigate(['login']);
      // }
    } else {
      // this.router.navigate(['login']);
      const modal = await this.modalController.create({
        component: AuthComponent,
        // componentProps: { medicine, storeName },
      });
      modal.onDidDismiss().then((data) => {});
      await modal.present();
    }
  }

  closeOrderFunc() {
    this.orderflag = false;
    this.orderMedicine = null;
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }
  //
  // The method 'onKeyUp()' is used to Search Medicine from the Medicine List
  onKeyUp(event: any) {
    console.log(event.target.value);
    this.search = event.target.value;
    if (event.target.value !== '') {
      this.medicineServ.storeMedicineArray = this.medicineServ.storeMedicineArray.filter(
        (res) => {
          return (res.medicinename + res.formula)
            .toLocaleLowerCase()
            .match(this.search.toLocaleLowerCase());
        }
      );
    } else {
      this.getMedicines();
    }
  } // End of the 'onKeyUp()' method
  /*
  ##############################
  Switches
  */
  // 1
  listDisplay() {
    this.switch = false;
  }
  // 2
  cardDisplay() {
    this.switch = true;
  }
  // 3
  // searchBarDisplay() {
  //   if (this.searchflag) {
  //     this.searchflag = false;
  //   } else {
  //     this.searchflag = true;
  //   }
  // }
  // 4
  onSelect(event: any) {
    console.log(event.target.value);
    this.onselect = event.target.value;
  }
  /*
 Alerts
 */
  async logout() {
    await (
      await this.alert.create({
        header: 'Logout',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: () => {
              // this.medicalService.deleteMedicine(_id).subscribe(data => {
              //   console.log(_id + 'Information Deleted');
              //   this.getMedicines();
              // });
            },
          },
        ],
      })
    ).present();
  }
  /*
################################
Navigator
*/
  navigateToStores() {
    this.router.navigate(['stores']);
  }
}
