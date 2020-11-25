import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/Services/store/stores.service';
import { MessageService } from 'src/app/Services/message/message.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-medicineonstore',
  templateUrl: './medicineonstore.component.html',
  styleUrls: ['./medicineonstore.component.scss'],
})
export class MedicineonstoreComponent implements OnInit {
  flag = false;
  success = false;
  search: any;
  // Variables
  medicineId: string;

  constructor(
    public medicineServ: MedicineService,
    private msgServ: MessageService,
    public storeServ: StoresService,
    public jwtServ: JwtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.signleMedicine();
  }
  /*
This Function is used to get
signle medicines Record
*/
  signleMedicine() {
    this.route.params.subscribe((params) => {
      this.medicineId = params.id;
      console.log(this.medicineId);
      this.medicineServ.getSingleMedicine(this.medicineId).subscribe(
        (data) => {
          if (data) {
            this.flag = true;
            this.medicineServ.medicine = data;
            console.log(data);
            // call getStores function
            console.log('Accessing related stores');
            this.getStores(this.medicineId);
            // this.presentToast();
          }
        },
        (err) => {
          console.log('Invalid Url');
        }
      );
    });
  }
  /*
This function is used to get all the STORES
Related to one medicines
Which shows the availability of Medicines on
different stores
*/
  getStores(id: string) {
    console.log('Medicine Id: ', id);
    this.storeServ.getStoresByMedicineId(id).subscribe(data => {
      if (data.status) {
      this.storeServ.storeArray = data.array;
      console.log(data);
      this.msgServ.message(data.status);
      this.success = data.success;
    } else {
      console.log(data);
      this.success = data.success;
      this.msgServ.message(data.status);
      }
    }, err => {
      console.log(err);
    });
  }
// The method 'onKeyUp()' is used to Search Medicine from the Medicine List
onKeyUp(event: any) {
  console.log(event.target.value);
  this.search = event.target.value;
  if (event.target.value !== '') {
    this.storeServ.storeArray = this.storeServ.storeArray.filter(
      (res) => {
        return (res.name + res.address)
          .toLocaleLowerCase()
          .match(this.search.toLocaleLowerCase());
      }
    );
  } else {
    this.getStores(this.medicineId);
  }
} // End of the 'onKeyUp()' method
/*
  /*
   */
  medicineOnStores(id: string) {
    this.router.navigate(['stores', 'visit', id ]);
  }
}
