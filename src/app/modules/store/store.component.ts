import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/Services/store/stores.service';
import { ToastController, AlertController,  } from '@ionic/angular';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { HistoryService } from '../history/history.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  imageurl = 'assets/images/MartialKing.PNG';
  // FLAGS
  loading = false;
  switch = true; 
  flag1 = false;
  internetflag = true;
  // searchflag = false;
  search: any;
  //
  skeletonlist = [1, 2, 3 , 4, 5, 6, 7, 8, 9, 10 ];
  // CONSTRUCTOR
  constructor(
    public storeServ: StoresService,
    public jwtServ: JwtService,
    public historyServ: HistoryService,
    private toastController: ToastController,
    private router: Router,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.getStores();
  }

  /*
This Function is used to get
All Stores Record
*/
  async getStores() {
    this.loading = true;
    const observable = await this.storeServ.getAllStores();
    observable.subscribe(
      data => {
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
          this.flag1 = true;
        }
      },
      err => {
        this.loading = false;
        this.flag1 = true;
        this.internetflag = false;
        console.log('Invalid Url');
      }
    );
  }
  /*
  Search function
  */
 //
    // The method 'onKeyUp()' is used to Search Medicine from the Medicine List
    saveSearch(event: any) {
      console.log(event.target.value);
      var body = {
        userId: this.jwtServ.getUserId(),
        search: event.target.value
      }
      this.historyServ.save(body).subscribe(
        (data) => {
          console.log(data);
        }
      );
    } // End of the 'onKeyUp()' method
  /*
 //

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
  navigateToMedicines() {
    this.router.navigate(['medicines']);
  }
  visitStore(id: string) {
    console.log(id);
    this.router.navigate(['stores', 'visit', id]);
  }
}
