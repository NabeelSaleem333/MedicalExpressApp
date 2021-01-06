import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/Services/store/stores.service';
import { CreatestoreComponent } from './createstore/createstore.component';
import { ModalController, AlertController } from '@ionic/angular';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Store } from 'src/app/models/schemas';
import * as jwt_token from 'jwt-decode';
import { InfoComponent } from './info/info.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MedicineinfoComponent } from './inventory/medicineinfo/medicineinfo.component';

@Component({
  selector: 'app-medicineonstore',
  templateUrl: './mystore.component.html',
  styleUrls: ['./mystore.component.scss'],
})
export class MystoreComponent implements OnInit {
  // ---------------------------
  imageUrl: string;
  // Flags
  loading = false;
  flag = false;
  // Variables
  decodeUserId: string;
  // Objects
  store: Store;
  //
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    scrollbar: true,
    autoplay: true
   };
   skeletonlist = [1];
  // ---------------------------
  constructor(
    public medicineServ: MedicineService,
    public storeServ: StoresService,
    private jwtServ: JwtService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.loadStoreDetails();
  }
  /*
    Function to load Store details
    if it exists.
 */
  loadStoreDetails() {
    this.loading = true;
    // we are getting the user information
    // from the token
    const token = this.jwtServ.getToken();
    const decode = jwt_token(token);
    this.decodeUserId = decode.id;
    console.log(this.decodeUserId); // UserId
    // Calling API function to get store record from the
    // MongoDB
    this.storeServ.getStoreByUserId(this.decodeUserId).subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        console.log(data);
        console.log(data);
        this.flag = true;
        this.store = data;
        this.imageUrl = this.store.image;
        console.log(this.imageUrl);
      } else {
        this.loading = false;
        this.flag = false;
        this.store = null;
        this.imageUrl = '';
        // console.log(this.imageUrl);
      }
    });
  }

  /*
  This is modal Create function which is linked with
  the CreatestoreComponent to create new store
   */
  async openCreateModal(userId: string) {
    if (this.jwtServ.getToken()) {
      const modal = await this.modalController.create({
        component: CreatestoreComponent,
        componentProps: { userId },
      });
      modal.onDidDismiss().then((data) => {
        console.log('dismissed', data);
        if (data.data.dismissed) {
        } else {
          this.flag = true;
          this.store = data.data;
          this.imageUrl = this.store.image;
          console.log(this.imageUrl);
          console.log(this.store);
        }
      });
      await modal.present();
    } else {
      this.router.navigate(['login']);
    }
  }

  /*
  This is modal Edit function which is linked with
  the CreatestoreComponent to create new store
   */
  async openEditModal(store?: Store) {
    // this.flag = false;
    if (this.jwtServ.getToken()) {
      const modal = await this.modalController.create({
        component: CreatestoreComponent,
        componentProps: { store },
      });
      modal.onDidDismiss().then((data) => {
        console.log('dismissed', data);
        if (data.data.dismissed) {
        } else {
          this.flag = true;
          this.store = data.data;
          this.imageUrl = this.store.image;
          console.log(this.imageUrl);
          console.log(this.store);
        }
      });
      await modal.present();
    } else {
      this.router.navigate(['login']);
    }
    // If After Editing the store
    // await this.loadStoreDetails();
  }

  /*  */
  //
  async openInfoModal(store: Store) {
    if (this.jwtServ.getToken()) {
      const modal = await this.modalController.create({
        component: InfoComponent,
        componentProps: { store },
      });
      await modal.present();
    } else {
      this.router.navigate(['login']);
    }
  }
  // #####################################################################################
  // #####################################################################################
  async openInfoMedicineModal(storeId: string, storename: string) {
    const modal = await this.modalController.create({
      component: MedicineinfoComponent,
      componentProps: { storeId, storename },
    });
    await modal.present();
  }
  // #####################################################################################
  // #####################################################################################
  /*
 Alerts
 */
  async deleteAlert(storename: string) {
    await (
      await this.alert.create({
        header: 'Delete ' + storename,
        message: 'Are you sure?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: () => {
              this.deleteStore();
            },
          },
        ],
      })
    ).present();
  }
  /*
  Function to delete the store details and its record
   */
  deleteStore() {
    this.storeServ.deleteStore(this.store._id).subscribe(
      (data) => {
        this.storeServ.store = data;
        console.log(data);
        this.flag = false;
        console.log(this.store);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // #####################################################################################
  // ###############################-Medicine-Inventory-##################################
  async openInventoryModal() {
    const modal = await this.modalController.create({
      component: InventoryComponent,
    });
    await modal.present();
  }
  // #####################################################################################
  // ###############################-Medicine-Inventory-##################################
  orders(storeId: string) {
    this.router.navigate(['dashboard', 'mystore', 'orders', storeId]);
  }
  // #####################################################################################
  /*
   */
  storeInfo(storeid: string) {
    this.router.navigate(['dashboard', 'mystore', 'storeinfo', storeid]);
  }
  medicineInventory(name: string, id: string) {
    this.router.navigate(['dashboard', 'mystore', 'inventory', name, id]);
  }
}
