import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwtService } from './core/services/jwt.service';
import { FirebaseImageHandler } from './Services/firebase/firebase-image-handler.service';
import { UserSettingsComponent } from './modules/user/user-settings/user-settings.component';
import { AuthService } from './core/services/auth.service';
import { MessageService } from './Services/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  imageUrl = null;
  isDesktop = false;
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<
    HTMLInputElement
  >;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Store',
      url: '/stores',
      icon: 'search',
    },
    {
      title: 'Medicine',
      url: 'medicines',
      icon: 'search',
    },
    {
      title: 'Charity',
      url: '/charity',
      icon: 'gift',
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person',
    },
    // {
    //   title: 'SignUp',
    //   url: '/signup',
    //   icon: 'person'
    // }
  ];

  userPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Stores',
      url: '/stores',
      icon: 'search',
    },
    {
      title: 'Medicines',
      url: 'medicines',
      icon: 'search',
    },
    {
      title: 'My Store',
      url: 'dashboard/mystore',
      icon: 'person',
    },
    {
      title: 'Cart',
      url: 'cart',
      icon: 'cart',
    },
    {
      title: 'Charity',
      url: '/charity',
      icon: 'gift',
    },
    {
      title: 'My Orders',
      url: 'dashboard/mystore/orders',
      icon: 'checkmark',
    },
    {
      title: 'History',
      url: '/history',
      icon: 'time',
    },
    {
      title: 'Settings',
      url: '/user/settings',
      icon: 'settings',
    },
    {
      title: 'Coutact Us',
      url: '/Contact Us',
      icon: 'send',
    },
    {
      title: 'About Us',
      url: '/About Us',
      icon: 'information-circle',
    },
    {
      title: 'logout',
      url: '/login',
      icon: 'log-out',
    },
  ];

  // public labels = ['Coutact Us', 'About Us' ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public jwtServ: JwtService,
    private authServ: AuthService,
    private msgServ: MessageService,
    private firebaseServImg: FirebaseImageHandler,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
    this.imageUrl = this.jwtServ.getUserImage();
    // console.log(this.jwtServ.getToken());
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
        const body = {
          email: this.jwtServ.getUserEmail(),
          image: this.imageUrl
        };
        // tslint:disable-next-line: variable-name
        this.authServ.changeImage(body).subscribe( data => {
          console.log(data);
          if (data.success) {
            this.jwtServ.setUserImage(this.imageUrl);
            this.msgServ.message(data.status);
          } else {
            this.msgServ.message(data.status);
          }
        });
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
  logout() {
    this.jwtServ.destroyToken();
  }

  /* This component is used for the
user information settings */
  // ##########################################################################
  async userSettingModal() {
    const modal = await this.modalController.create({
      component: UserSettingsComponent,
      // componentProps: { storename, storeId },
    });

    await modal.present();
  }
}
