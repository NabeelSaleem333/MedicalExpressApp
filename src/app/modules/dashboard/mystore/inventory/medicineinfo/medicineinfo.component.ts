import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';

@Component({
  selector: 'app-medicineinfo',
  templateUrl: './medicineinfo.component.html',
  styleUrls: ['./medicineinfo.component.scss'],
})
export class MedicineinfoComponent implements OnInit {
  // FLAG
  // COUNTER
  capCount = 0;
  tabCount = 0;
  tubCount = 0;
  spCount = 0;
  injCount = 0;
  othersCount = 0;
  // Variables
  @Input()
  storeId: string;
  storename: string;
  // CONSTRUCTOR
  constructor(
    private medicineServ: MedicineService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
      console.log(this.storeId);
      console.log(this.storename);

      this.getMedicinesByStoreId();
  }

  getMedicinesByStoreId() {
    this.medicineServ.getMedicinesByStoreId(this.storeId).subscribe(
      (data) => {
        console.log(data);
        if (data.success) {
        this.medicineServ.storeMedicineArray = data.array;
        for (const medicine of this.medicineServ.storeMedicineArray) {
          if (medicine.format === 'capsule' || medicine.format === 'Capsule'
          || medicine.format === 'Capsul' || medicine.format === 'capsul'  ) {
            this.capCount += 1;
          } else if (medicine.format === 'Tablet' || medicine.format === 'tablet' ) {
            this.tabCount += 1;
          } else if (medicine.format === 'Tube' || medicine.format === 'tube' ) {
            this.tubCount += 1;
          } else if (medicine.format === 'Syrup' || medicine.format === 'syrup' ) {
            this.spCount += 1;
          } else if (medicine.format === 'Injection' || medicine.format === 'injection' ) {
            this.injCount += 1;
          } else if (medicine.format === 'Others' || medicine.format === 'others' ) {
            this.othersCount += 1;
          }
        }
        console.log(this.capCount);
        console.log(this.tabCount);
        console.log(this.tubCount);
        console.log(this.spCount);
        console.log(this.injCount);
      }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closeFunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
