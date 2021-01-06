import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/Services/message/message.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  forgetform: FormGroup;
  flag1 = false;
  flag2 = false;
  spinner1 = false;
  spinner2 = false;
  spinner3 = false;
  // CONSTRUCTOR
  constructor(
    private authServ: AuthService,
    private msgServ: MessageService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgetFormInit();
  }

  forgetFormInit() {
    this.forgetform = this.formbuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('([a-zA-Z0-9.]{3,})@gmail[.]com'),
        ],
      ],
      otpcode: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{6,})*$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?!^[0-9]*$)(?!^[a-z]*$)(?!^[A-Z]*$)^(.{8,15})$'),
        ],
      ],
    });
  }
  /* Verify Email Address */
  verifyEmail() {
    if (this.forgetform.value.email === '') {
      this.msgServ.message('Please First Enter Valid Email');
    } else {
      this.spinner1 = true;
      this.authServ.verifyEmail(this.forgetform.value).subscribe((data) => {
        if (data.success) {
          this.msgServ.message(data.status);
          this.flag1 = true;
          this.spinner1 = false;
        } else {
          this.msgServ.message(data.status);
          this.spinner1 = false;
        }
        console.log(data);
      });
    }
  }
  /* Verify Email Address */
  verifyOTPCode() {
    if (this.forgetform.value.otpcode === '') {
      this.msgServ.message('Please First Enter Valid OTP Code');
    } else {
      this.spinner2 = true;
      this.authServ.verifyOTPCode(this.forgetform.value).subscribe((data) => {
        if (data.success) {
          this.msgServ.message(data.status);
          this.flag2 = true;
          this.spinner2 = false;
        } else {
          this.msgServ.message(data.status);
          this.spinner2 = false;
        }
        console.log(data);
      });
    }
  }
    /* Change Password */
  changePassword() {
      if (this.forgetform.value.password === '') {
        this.msgServ.message('Please First Enter Password');
      } else {
        this.spinner3 = true;
        this.authServ.changePassword(this.forgetform.value).subscribe((data) => {
          if (data.success) {
            this.msgServ.message(data.status);
            this.spinner3 = false;
            this.forgetFormInit();
            this.router.navigate(['login']);
          } else {
            this.msgServ.message(data.status);
            this.spinner3 = false;
          }
          console.log(data);
        });
      }
    }
}
