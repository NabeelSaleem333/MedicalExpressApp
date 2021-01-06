import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { MedicineService } from 'src/app/Services/medicine/medicine.service';
import { StoreMedicine } from 'src/app/models/schemas';
import { FirebaseImageHandler } from 'src/app/Services/firebase/firebase-image-handler.service';

@Component({
  selector: 'app-addmedicine',
  templateUrl: './addmedicine.component.html',
  styleUrls: ['./addmedicine.component.scss'],
})
export class AddmedicineComponent implements OnInit {
  // Flags
  flag = false;
  // Variables
  imageUrl: string;
  // Objects
  @Input()
  name: string;
  medicine: StoreMedicine;
  @Input()
  storeId: string;
  storename: string;
  medicineForm: FormGroup;

  // CONSTRUCTOR
  constructor(
    private medicineServ: MedicineService,
    private firebaseServImg: FirebaseImageHandler,
    private formbuilder: FormBuilder,
    private modalController: ModalController,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.formInitializer();
    if (this.medicine) {
      this.flag = true;
      this.storename = this.name;
      console.log(this.medicine);
      this.medicineForm.patchValue(this.medicine);
      // console.log(this.storeId);
    }
  }

  // Function to initialize the form
  formInitializer() {
    this.medicineForm = this.formbuilder.group({
      // _id: ['', Validators.required],
      medicinename: ['', [Validators.required, Validators.pattern('([a-zA-Z_ ]{3,})*$'), ]],
      image: [''],
      formula: ['', Validators.required],
      format: ['', Validators.required],
      ingredients: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]*$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]*$')]],
      store_id: ['1', Validators.required], // Assign Raw 1 ID for medicine form initialization
    });
  }
  async selectImage(event) {
    console.log(event.target.files);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const obs = await this.firebaseServImg.uploadProfileImg(
        { file },
        'profiles'
      );
      obs.subscribe((data) => {
        console.log(data);
        this.imageUrl = data;
      });
    }
  }
  //
  //
  public addMedicine(form: FormGroup) {
    console.log(this.medicineForm.value);
    // Adding New Medicine in the database
    if (!this.flag) {
      this.medicineForm.value.store_id = this.storeId;
      this.medicineForm.value.image = this.imageUrl;
      // this.medicineForm.value.image = 'src/assets/images/user.png';
      this.medicineServ.addMedicine(this.medicineForm.value).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.medicineServ.medicine = data;
            this.message('Medicine Saved Success!');
            console.log(data);
            this.modalController.dismiss();
          } else {
            this.message('This Medicine already in store');
          }
        },
        (error) => {
          console.log(error);
        }
      );
      // Updating the Existing Medicine
    } else {
      const medicineObj = {
        medicinename: this.medicineForm.value.medicinename,
        formula: this.medicineForm.value.formula,
        format: this.medicineForm.value.format,
        ingredients: this.medicineForm.value.ingredients,
        quantity: this.medicineForm.value.quantity,
        price: this.medicineForm.value.price,
        image: this.imageUrl,
      };
      console.log(medicineObj);
      console.log(this.medicine.storeId, this.medicine.id);
      this.medicineServ
        .updateMedicineByStoreIdAndMedicineId(
          this.medicine.storeId,
          this.medicine.id,
          medicineObj
        )
        .subscribe(
          (data) => {
            console.log(data);
            if (data) {
              this.message('Medicine Updated Success!');
              this.modalController.dismiss();
            } else {
              this.message('Medicine Not Updated');
              this.modalController.dismiss();
            }
          },
          (error) => {
            this.message(error);
            this.modalController.dismiss();
          }
        );
    }
  }
  closeFunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  async message(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 3000,
    });
    t.present();
  }
}
