import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Store } from 'src/app/models/schemas';
import { StoresService } from 'src/app/Services/store/stores.service';
import { CreatestoreComponent } from '../createstore/createstore.component';

@Component({
  selector: 'app-storeinfo',
  templateUrl: './storeinfo.component.html',
  styleUrls: ['./storeinfo.component.scss'],
})
export class StoreinfoComponent implements OnInit {
  imageUrl: string;
  // Flags
  flag = false;
  // Variables
  decodeUserId: string;
  // Objects
  store: Store;
  constructor(
    private jwtServ: JwtService,
    private storeServ: StoresService,
    private modalController: ModalController,
    private router: Router,
    private alert: AlertController
    ) { }

  ngOnInit() {
    this.loadStoreDetails();
  }
  /*
    Function to load Store details
    if it exists.
 */
loadStoreDetails() {
  // we are getting the user information
  // from the token
  const userId = this.jwtServ.getUserId();
  // Calling API function to get store record from the
  // MongoDB
  this.storeServ.getStoreByUserId(userId).subscribe((data) => {
    if (data) {
      console.log(data);
      this.flag = true;
      this.store = data;
      this.imageUrl = this.store.image;
      // console.log(this.imageUrl);
    }
  });
  }

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
      this.backToStore();
    },
    (err) => {
      console.log(err);
    }
  );
}


backToStore() {
  this.router.navigate(['dashboard', 'mystore']);
}
}
