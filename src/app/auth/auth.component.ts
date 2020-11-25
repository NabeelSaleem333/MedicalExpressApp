import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { ModalController } from '@ionic/angular';
import { MessageService } from '../Services/message/message.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signupform: FormGroup;
  loginform: FormGroup;
  // Flag
  flag = false;

  constructor(
    private modalController: ModalController,
    private authServ: AuthService,
    private jwtServ: JwtService,
    private formbuilder: FormBuilder,
    private router: Router,

    private msgServ: MessageService
  ) {}

  ngOnInit() {
    this.loginInit();
  }

  // ^[a-z0-9._%+-]+@[a-z0-9.%-]+.[a-z]{3,5}$
  signUpInit() {
    this.signupform = this.formbuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^([a-zA-Z_ ]{5,})*$')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('([a-zA-Z0-9.]{4,})@gmail[.]com'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?!^[0-9]*$)(?!^[a-z]*$)(?!^[A-Z]*$)^(.{8,15})$'),
        ],
      ],
    });
    //
    this.flag = true;
  }


  signUpFunc() {
    console.log(this.signupform.value);
    this.authServ.signup(this.signupform.value).subscribe(
      (data) => {
        console.log(data);
        // Save Token to Local Storage
        if (data.success) {
          this.jwtServ.setToken(data.token, this.signupform.value.username, this.signupform.value.email);
          // this.modalController.dismiss();
          // this.router.navigate(['home']);
          console.log(data.status);
          this.msgServ.message(data.status);
          this.router.navigate(['dashboard', 'mystore']);
        } else {
          console.log(data.status);
          this.msgServ.message(data.status);
        }
      },
      (err) => console.error(err)
    );
  }

  loginInit() {
    this.loginform = this.formbuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('([a-zA-Z0-9.]{4,})@gmail[.]com'),
          Validators.email
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?!^[0-9]*$)(?!^[a-z]*$)(?!^[A-Z]*$)^(.{8,15})$'),
        ],
      ],
    });
    //
    this.flag = false;
  }

  //
  loginFunc() {
    console.log(this.loginform.value);
    this.authServ.login(this.loginform.value).subscribe(
      (data) => {
        console.log(data);
        if (data.success) {
        // Save Token to Local Storage
        this.jwtServ.setToken(data.token, data.status, this.loginform.value.email);
        this.modalController.dismiss();
        console.log(data.status);
        this.msgServ.message(data.status);
        // this.router.navigate(['home']);
        this.router.navigate(['dashboard', 'mystore']);
        } else {
          console.log(data.status);
          this.msgServ.message(data.status);
        }
      },
      (err) => console.error(err)
    );
  }
  closelogin() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  //
  navigateToSignUp() {
    // this.router.navigate(['signup']);
  }

  // private errorHandler(error, message) {
  //   console.error(error);
  //   this.snackbar.open(message, 'Error', {
  //     duration: 2000
  //   });
  // }
}
