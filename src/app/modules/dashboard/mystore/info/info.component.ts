import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input()
  store: Store;
  // CONSTRUCTOR
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log(this.store);
  }


  closeFunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
