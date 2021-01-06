import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MessageService } from 'src/app/Services/message/message.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  settingform: FormGroup;
  userId: string;
  user: any;
  pwd: string;
  flagPwd = false;
  flag1 = false;
  flag2 = false;
  //
  constructor(
    private jwtServ: JwtService,
    private msgServ: MessageService,
    private userServ: UserService,
    private authServ: AuthService,
    private formbuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.InitUserForm();
    this.userId = this.jwtServ.getUserId();
    this.userServ.getUser(this.userId).subscribe((data) => {
      console.log('User Settings Component: ', data);
      if (data.success) {
        this.settingform.setValue({
          username: data.user.username,
          email: data.user.email,
          oldpassword: '',
          newpassword: '',
        });
      } else {
        this.msgServ.message(data.status);
      }
    });
  }

  InitUserForm() {
    this.settingform = this.formbuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^([a-zA-Z_ ]{3,})*$')],
      ],
      email: [''],
      oldpassword: [
        '',
        [
          Validators.required,
          Validators.pattern('(?!^[0-9]*$)(?!^[a-z]*$)(?!^[A-Z]*$)^(.{8,15})$'),
        ],
      ],
      newpassword: [
        '',
        [
          Validators.required,
          Validators.pattern('(?!^[0-9]*$)(?!^[a-z]*$)(?!^[A-Z]*$)^(.{8,15})$'),
        ],
      ]
    });
    //
  }
  /*
  This function is use to change the settings
  for the existing user like
  1-name
  2-password
  */
  changeUserFunc() {
    // Show user details
    console.log(this.settingform.value);
    // Check old and new password are same or not
    if (this.settingform.value.oldpassword === '' || this.settingform.value.newpassword === ''
        || this.settingform.value.username === '') {
      this.msgServ.message('Please fill all fields!');
    } else {
      // create object of user to save
      this.user = {
        username: this.settingform.value.username,
        oldpassword: this.settingform.value.oldpassword,
        newpassword: this.settingform.value.newpassword,
      };

      // call the API update user function
      this.userServ.updateUser(this.userId, this.user).subscribe(
      (data) => {
        if (data.success) {
        // After getting data from the server
        // store username, email in local storage
        this.jwtServ.setUserDetail(data.user.username, data.user.email);
        // console.log(data);
        this.msgServ.message(data.status);
      } else {
        this.msgServ.message(data.status);
      }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
/* Verify Old Password */
  verifyOldPassword() {
    if (this.settingform.value.oldpassword === '') {
      this.msgServ.message('Please First Enter Old Password');
    } else {
      this.authServ.verifyPassword(this.settingform.value.email, this.settingform.value.oldpassword).subscribe(data => {
        if (data.success) {
          this.msgServ.message(data.status);
          this.flag1 = true;
        } else {
          this.msgServ.message(data.status);
        }
      });
    }
  }
/* Change/New Password */
changePassword() {
  if (this.settingform.value.newpassword === '') {
    this.msgServ.message('Please First Enter New Password');
  } else {
    const body = {
      email: this.settingform.value.email,
      password: this.settingform.value.newpassword
    };
    this.authServ.changePassword(body).subscribe(data => {
      if (data.success) {
        this.msgServ.message(data.status);
        this.flag1 = true;
        this.settingform.setValue({
          username: this.settingform.value.username,
          email: this.settingform.value.email,
          oldpassword: '',
          newpassword: '',
        });
        this.flag1 = false;
        this.router.navigate(['home']);
      } else {
        this.msgServ.message(data.status);
      }
    });
  }
}
/* This function is used to go back to
last back */
  backfunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
/* Navigate to forget password */
  navigateToForget() {
    this.router.navigate(['forgetpassword']);
  }
}
