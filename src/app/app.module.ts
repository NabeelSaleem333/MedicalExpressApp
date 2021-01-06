import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleSharedModule } from './modules/module-shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthComponent } from './auth/auth.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { UserSettingsComponent } from './modules/user/user-settings/user-settings.component';

//

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AuthComponent, UserSettingsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // Ng2SearchPipeModule,
    ModuleSharedModule,
    DashboardModule,
    AuthModule,
    
    // CoreModule,
    // This related to all the Main Modules of the Project
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
