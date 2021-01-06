import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/Services/store/stores.service';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  // Flags
  loading = false;
  // Variables
  userId: string;
  // Counters
  cartCounter = 0;
  storeCount = 0;
  // tslint:disable-next-line: variable-name
  // Objects n Arrays
  cart: OnStores[];
  search: any;
  skeletonlist = [1, 2, 3 , 4, 5, 6, 7, 8, 9, 10 ];
  //
  constructor(
    private jwtServ: JwtService,
    public cartServ: CartService,
    private router: Router,
    private toastController: ToastController,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.userId = this.jwtServ.getUserId();
    this.loadcart();
  }

  loadcart() {
    this.loading = true;
    console.log('loading cart');
    this.cartServ.loadcartonstores(this.userId).subscribe(
      (data) => {
        if (data) {
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          console.log(data);
          console.log(data);
          this.storeCount = data.length;
          this.cart = data;
          for (const c of this.cart) {
            this.cartCounter += c.size;
          }
        } else {
          this.loading = false;
          this.cartCounter = 0;
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }


   // The method 'onKeyUp()' is used to Search Medicine from the Medicine List
   onKeyUp(event: any) {
    console.log(event.target.value);
    this.search = event.target.value;
    if (event.target.value !== '') {
      this.cart = this.cart.filter(
        (res) => {
          return (res.name + res.address)
            .toLocaleLowerCase()
            .match(this.search.toLocaleLowerCase());
        }
      );
    } else {
      this.loadcart();
    }
  } // End of the 'onKeyUp()' method
  /*


  /*
  Alert to remove the medicine
  from cart
 */
  async removeAlert(storeId: string, name: string) {
    console.log(storeId);
    await (
      await this.alert.create({
        header: name ,
        message: 'Are you sure to delete?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: (alertdata) => {
              this.removeCartFromOneStore(storeId);
            },
          },
        ],
      })
    ).present();
  }
  /*
  This function is used to remove
  one medicine from the cart
   */
  removeCartFromOneStore(storeId: string) {
    this.cartServ.removeOneStoreCart(this.userId, storeId).subscribe(
      (data) => {
        console.log(data);
        // Message for the User
        this.presentToast('Medicine Remove From Cart');
        // Again load the Cart
        this.cartCounter = 0;
        this.loadcart();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*
  This a toast function to present
  appropriate message to the user
  */
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }
  /*
Navigator
*/
  visitStore(storeId: string) {
  this.router.navigate(['stores', 'visit', storeId]);
  }
  navigateToMedicines() {
    this.router.navigate(['medicines']);
  }
  cartMedicines(storeId: string, storename: string) {
    this.router.navigate(['cart', storename, storeId]);
  }
}

export class OnStores {
  // tslint:disable-next-line: variable-name
  _id: string;
  storeId: string;
  name: string;
  address: string;
  size: number;
  image: string;
}

// export class CartMedicine {
//   // tslint:disable-next-line: variable-name
//   _id: string;
//   medicinename: string;
//   formula: string;
//   format: string;
//   ingredients: number;
//   quantity: number;
//   price: number;
//   name: string;
//   storeId: string;
// }
