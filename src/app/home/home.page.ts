import { Component, OnInit } from '@angular/core';
import { StoresService } from '../Services/store/stores.service';
import { ToastController, ModalController } from '@ionic/angular';
import { CreatestoreComponent } from '../modules/dashboard/mystore/createstore/createstore.component';
import { Router } from '@angular/router';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  imageurl = 'assets/images/MartialKing.PNG';
  // Flags
  switch = false;
  flag1 = false;
  internetflag = true;

  // CONSTRUCTOR
  constructor(
    public storeServ: StoresService,
    private jwtServ: JwtService,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}


  // This function is used to search medical stores
  goToStores() {
    this.router.navigate(['stores']);
  }
    // This function is used to search medicines
  goToMedicines() {
    this.router.navigate(['medicines']);
  }
  //
  async openAddModal() {
    if (this.jwtServ.getToken()) {
    const modal = await this.modalController.create({
      component: CreatestoreComponent
    });
    // modal.onDidDismiss().then(data => {
    //   console.log('dismissed', data);
    // });
    await modal.present();
  } else {
    this.router.navigate(['login']);
  }
}
}
