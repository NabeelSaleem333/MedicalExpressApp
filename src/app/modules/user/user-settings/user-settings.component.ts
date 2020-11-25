import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
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
  //
  constructor(
    private jwtServ: JwtService,
    private msgServ: MessageService,
    private userServ: UserService,
    private formbuilder: FormBuilder,
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
    if (this.settingform.value.password === this.settingform.value.newpassword) {
      // create object of user to save
      console.log('password matched');
      this.user = {
        username: this.settingform.value.username,
        password: this.settingform.value.password,
      };
    } // end of if
    if (this.settingform.value.username !== this.jwtServ.getUserName()) {
      console.log('Username not changed');
      this.user = {
        username: this.settingform.value.username,
        password: this.settingform.value.password,
      };
    } else {
      return;
    }
    // call the API update user function
    this.userServ.updateUser(this.userId, this.user).subscribe(
      (data) => {
        // After getting data from the server
        // store username, email in local storage
        this.jwtServ.setUserDetail(data.user.username, data.user.email);
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /* A switch function to set the password
  for the existing user */
  setPasswordFunc() {
    if (this.flagPwd) {
      this.flagPwd = false;
    } else {
      this.flagPwd = true;
    }

  }
/* This function is used to verify the old password
for the existing user */
verifyOldPassword() {
console.log(this.userId);
console.log(this.settingform.value);
const body = {
  password: this.settingform.value.password
};
this.userServ.verifyPassword(this.userId, body).subscribe(data => {
console.log('Verified Password ', data);
});
}
/* This function is used to go back to
last back */
  backfunc() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
