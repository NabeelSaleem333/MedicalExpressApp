import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { Medicine } from 'src/app/models/schemas';
import { HistoryService } from '../history/history.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
})
export class MedicineComponent implements OnInit {
  imageurl = 'assets/images/MartialKing.PNG';
  // Flags
  loading = false;
  switch = true;
  flag1 = false;
  internetflag = true;
  // searchflag = false;
  // Variables
  onselect = 'all';
  search: any;
  // Array
  tempArray: Medicine[];
  skeletonlist = [1, 2, 3 , 4, 5, 6, 7, 8, 9, 10 ];
  // CONSTRUCTOR
  constructor(
    public medicineServ: MedicineService,
    public historyServ: HistoryService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMedicines();
  }

  /*
This Function is used to get
All Stores Record
*/
  getMedicines() {
    this.loading = true;
    this.medicineServ.getMedicines().subscribe(
      (data) => {
        if (data) {
          // this.presentToast();
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          console.log(data);
          this.tempArray = this.medicineServ.MedicineArray = data;
          this.flag1 = true;
          this.tempMedicineArray();
        } else {
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
  tempMedicineArray() {
    console.log('temp array');
    this.tempArray = this.medicineServ.MedicineArray;
    console.log(this.tempArray);
  }
  /*
  This is a Search Function
  */
  //
  // The method 'onKeyUp()' is used to Search Medicine from the Medicine List
  // onKeyUp(event: any) {
  //   console.log(event.target.value);
  //   this.search = event.target.value;
  //   if (event.target.value !== '') {
  //     this.tempArray = this.tempArray.filter(
  //       (res) => {
  //         return (res.medicinename + res.formula)
  //           .toLocaleLowerCase()
  //           .match(this.search.toLocaleLowerCase());
  //       }
  //     );
  //   } else {
  //     this.tempMedicineArray();
  //   }
  // } // End of the 'onKeyUp()' method
  /*
  This function is used to filter data
  according to Medicine Format
  */
  onSelect(event: any) {
    this.onselect = event.target.value;
    console.log(this.onselect);
    if (this.onselect !== 'all') {
      this.tempArray = this.medicineServ.MedicineArray.filter(
        (res) => {
          return res.format.match(this.onselect);
        });
    } else {
      this.tempMedicineArray();
    }
  }

  saveSearch(event: any) {
    console.log(event.target.value);
    var body = {
      search: event.target.value
    }
    this.historyServ.save(body).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
  /*
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
    });
    toast.present();
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
  // searchBarDisplay() {
  //   if (this.searchflag) {
  //     this.searchflag = false;
  //   } else {
  //     this.searchflag = true;
  //   }
  // }
  /*
################################
Navigator
*/
  navigateToStores() {
    this.router.navigate(['stores']);
  }
// Function to navigate to the list of stores on
// which medicine is available or not
  medicineOnStores(id: string) {
    console.log('On Stores');
    console.log(id);
    this.router.navigate(['medicines', 'on', id]);
  }
}
