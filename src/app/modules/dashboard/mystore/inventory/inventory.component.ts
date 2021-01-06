import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ModalController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { AddmedicineComponent } from './addmedicine/addmedicine.component';
import { MedicineinfoComponent } from './medicineinfo/medicineinfo.component';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { Medicine, Store, StoreMedicine } from 'src/app/models/schemas';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  imageurl = 'assets/images/MartialKing.PNG';
  success: false;
  status: '';
  // Flags
  loading = false;
  flag = false;
  switch = false;
  searchflag = false;
  // Variables
  storename: string;
  storeId: string;
  onselect: any;
  search: any;
  // Objects
  // Array
  tempArray: StoreMedicine[];
  skeletonlist = [1, 2, 3 , 4, 5, 6, 7, 8, 9, 10 ];
  // @Input()
  // userId: string;

  // CONSTRUCTOR
  constructor(
    public medicineServ: MedicineService,
    private modalController: ModalController,
    private toast: ToastController,
    private alert: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.storeId = param.id;
      this.storename = param.name;
      this.getAllStoreMedicnes();
      // console.log(name);
    });
  }
  // ##########################################################################
  getAllStoreMedicnes() {
    this.loading = true;
    this.medicineServ.getMedicinesByStoreId(this.storeId).subscribe((data) => {
      this.success = data.success;
      this.status = data.status;
      if (this.success) {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
        console.log(this.storename, 'Medicines:', data);
        this.medicineServ.storeMedicineArray = data.array;
        this.tempMedicineArray();
        // show toast message to the user
        this.present(this.status);
      } else {
        this.loading = false;
        console.log(this.storename, 'Medicines:', data);
      }
    }, (err) => {
      this.loading = false;
      console.log('Invalid Url');
    }
    );
  }
  // ##########################################################################
  // #####################################################################################
  /*
 Alerts
 */
  async deleteAlert() {
    await (
      await this.alert.create({
        header: 'Delete All Medicines',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: () => {
              this.deleteStoreMedicnes();
            },
          },
        ],
      })
    ).present();
  }
  deleteStoreMedicnes() {
    this.medicineServ
      .deleteMedicinesByStoreId(this.storeId)
      .subscribe((data) => {
        console.log(data);
        this.present('All Medicines Deleted Success!');
        this.getAllStoreMedicnes();
      });
  }
  // ##########################################################################
  async openAddMedicineModal(storeId: string, storename: string) {
    const modal = await this.modalController.create({
      component: AddmedicineComponent,
      componentProps: { storeId, storename },
    });
    modal.onDidDismiss().then((data) => {
      this.getAllStoreMedicnes();
    });
    await modal.present();
  }
  // ##########################################################################
  async openEditMedicineModal(name: string, medicine: StoreMedicine) {
    const modal = await this.modalController.create({
      component: AddmedicineComponent,
      componentProps: { name, medicine },
    });
    modal.onDidDismiss().then(() => {
      // console.log(data);
      this.getAllStoreMedicnes();
    });
    await modal.present();
  }


  tempMedicineArray() {
    console.log('temp array');
    this.tempArray = this.medicineServ.storeMedicineArray;
    console.log(this.tempArray);
  }
  /*
  This function is used to filter data
  according to Medicine Format
  */
 onSelect(event: any) {
  this.onselect = event.target.value;
  console.log(this.onselect);
  if (this.onselect !== 'all') {
    this.tempArray = this.medicineServ.storeMedicineArray.filter(
      (res) => {
        return res.format.match(this.onselect);
      });
  } else {
    this.tempMedicineArray();
  }
}
  // #####################################################################################
  /*
 Alerts
 */
  async deleteSingleAlert(mId: string, name: string) {
    await (
      await this.alert.create({
        header: 'Delete ' + name,
        message: 'Are you sure?',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: () => {
              this.deleteSingleMedicnes(mId);
            },
          },
        ],
      })
    ).present();
  }
  deleteSingleMedicnes(mId: string) {
    this.medicineServ
      .deleteMedicineByStoreIdAndMedicineId(this.storeId, mId)
      .subscribe((data) => {
        console.log(data);
        this.present('Medicine Deleted Successfully!');
        this.getAllStoreMedicnes();
      });
  }
  // ##########################################################################
  async medicinesInfoModal(storename: string, storeId: string) {
    const modal = await this.modalController.create({
      component: MedicineinfoComponent,
      componentProps: { storename, storeId },
    });

    await modal.present();
  }

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
  searchBarDisplay() {
    if (this.searchflag) {
      this.searchflag = false;
    } else {
      this.searchflag = true;
    }
  }
  /*
  Search function
  */
  //
  // The method 'onKeyUp()' is used to Search Medicine from the Medicine List
  // onKeyUp(event: any) {
  //   console.log(event.target.value);
  //   this.search = event.target.value;
  //   if (event.target.value !== '') {
  //     this.medicineServ.storeMedicineArray = this.medicineServ.storeMedicineArray.filter(
  //       (res) => {
  //         return (res.medicinename + res.formula + res.format)
  //           .toLocaleLowerCase()
  //           .match(this.search.toLocaleLowerCase());
  //       }
  //     );
  //   } else {
  //     this.getAllStoreMedicnes();
  //   }
  // } // End of the 'onKeyUp()' method
  // ##########################################################################
  async present(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 2000,
    });
    await t.present();
  }
}
