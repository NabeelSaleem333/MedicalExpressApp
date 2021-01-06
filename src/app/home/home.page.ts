import { Component, OnInit } from '@angular/core';
import { StoresService } from '../Services/store/stores.service';
import { ToastController, ModalController } from '@ionic/angular';
import { CreatestoreComponent } from '../modules/dashboard/mystore/createstore/createstore.component';
import { Router } from '@angular/router';
import { JwtService } from '../core/services/jwt.service';
import { MedicineService } from '../Services/medicine/medicine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  imageurl = 'assets/images/MartialKing.PNG';
  // Flags
  loading = false;
  switch = false;
  flag1 = false;
  internetflag = true;
  skeletonlist = [1, 2 ];
  // Slider
  sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
  };
  SliderConfig = {
    initialSlide: 0,
    slidesPerView: 1.4,
    spaceBetween: 0,
    centeredSlides: true,
  };
  // CONSTRUCTOR
  constructor(
    public storeServ: StoresService,
    public medicineServ: MedicineService,
    private jwtServ: JwtService,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getStores();
    this.getMedicines();
  }

  async getStores() {
    this.loading = true;
    const observable = await this.storeServ.getAllStores();
    observable.subscribe(
      (data) => {
        console.log(data);
        const success = data.success;
        console.log(success);
        if (success) {
          // this.presentToast();
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          console.log(data);
          this.storeServ.storeArray = data.store;
          this.flag1 = true;
        } else {
          console.log(data.status);
          this.loading = false;
        }
      },
      (err) => {
        this.loading = false;
        this.internetflag = false;
        console.log('Invalid Url');
      }
    );
  }

  getMedicines() {
    this.medicineServ.getMedicines().subscribe(
      (data) => {
        if (data) {
          // this.presentToast();
          console.log(data);
          this.medicineServ.MedicineArray = data;
        }
      },
      (err) => {
        this.internetflag = false;
        console.log('Invalid Url');
      }
    );
  }
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
        component: CreatestoreComponent,
      });
      // modal.onDidDismiss().then(data => {
      //   console.log('dismissed', data);
      // });
      await modal.present();
    } else {
      this.router.navigate(['login']);
    }
  }

  searchStores() {
    this.router.navigate(['stores']);
  }
  searchMedicines() {
    this.router.navigate(['medicines']);
  }
  medicineOnStores(id: string) {
    console.log('On Stores');
    console.log(id);
    this.router.navigate(['medicines', 'on', id]);
  }
  visitStore(id: string) {
    console.log(id);
    this.router.navigate(['stores', 'visit', id]);
  }
}
