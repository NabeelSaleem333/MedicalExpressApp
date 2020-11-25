import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { StoresService } from 'src/app/Services/store/stores.service';
import { Store } from 'src/app/models/schemas';
import { FirebaseImageHandler } from 'src/app/Services/firebase/firebase-image-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './createstore.component.html',
  styleUrls: ['./createstore.component.scss'],
})
export class CreatestoreComponent implements OnInit {
  [x: string]: any;
  // Flags
  flag = false;
  // Variables
  // Objects
  @Input()
  userId: string;
  @Input()
  store: Store;
  createForm: FormGroup;
  //
  imageUrl = '';
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<
  HTMLInputElement
>;

  // CONSTRUCTOR
  constructor(
    private storeServ: StoresService,
    private firebaseServImg: FirebaseImageHandler,
    private formbuilder: FormBuilder,
    private modalController: ModalController,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.formInitializer();
    // Here we are editing the store details
    if (this.store) {
      this.flag = true;
      console.log(this.store._id);
      this.createForm.patchValue(this.store);
    }
  }

  // Function to initialize the form
  formInitializer() {
    this.createForm = this.formbuilder.group({
      // _id: ['', Validators.required],
      name: ['', [ Validators.required, Validators.pattern('^([a-zA-Z_ ]{5,})*$'), ]],
      image: ['', Validators.required],
      license: ['', [ Validators.required, Validators.pattern('^[0-9]+$') ]],
      contact: ['', [ Validators.required, Validators.pattern('^[0-9]+$') ]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      date: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }
  //
  onPickImage() {
    this.filePickerRef.nativeElement.click();
    // return;
  }
  //
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
        // setTimeout(() => {
        //   const obsDel = this.firebaseServImg.deleteImage(data);
        //   console.log(obsDel);
        //   // tslint:disable-next-line: no-shadowed-variable
        //   // obsDel.subscribe((data: any) => {
        //   // console.log(data);
        //   this.imageUrl = null;

        //   // });
        // }, 20000);
      });
    }
  }
  //
  SubmitForm() {
    // Run condition when editing store
    if (this.store) {

      if (this.imageUrl === '') {
        this.imageUrl = this.store.image;
      }
      const editObj = {
        name: this.createForm.value.name,
        image: this.imageUrl,
        license: this.createForm.value.license,
        contact: this.createForm.value.contact,
        address: this.createForm.value.address,
        city: this.createForm.value.city,
        province: this.createForm.value.province,
      };
      console.log(editObj);
      console.log(this.store._id);
      this.storeServ.editStore(this.store._id, editObj).subscribe(
        (data) => {
          console.log(data);
          this.presentToast('Store Updated Successful!');
          this.modalController.dismiss(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else { // Run when creating new store
      // this.createForm.value.image = 'src';
      // this.createForm.value.image = this.imageUrl;
      this.createForm.value.image = 'src/assets/images/user.png';
      this.createForm.value.date = Date.now();
      this.createForm.value.userId = this.userId;
      console.log(this.createForm.value.image);
      this.storeServ.createNewStore(this.createForm.value).subscribe((data) => {
        console.log(data);
        this.presentToast('Store Created');
        this.modalController.dismiss(data);
      });
    }
  }




  //
  selectCity(event: any) {
    console.log(event.target.value);
    if (event.target.value === 'Islamabad') {
      this.createForm.value.province = 'Capital';
    } else if (event.target.value === 'Rawalpindi') {
      this.createForm.value.province = 'Punjab';
    }
  }
  //
  closeFunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  //
  async presentToast(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 3000,
    });
    t.present();
  }
}
