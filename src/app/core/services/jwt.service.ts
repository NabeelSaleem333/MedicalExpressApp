import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import * as jwt_token from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private storage: Storage) { }

  public setToken(token: string, name: string, email: string) {
    // console.log(token.valueOf());
    // this.storage.set('token', token);
    // console.log(this.storage.set('token', token));

    window.localStorage.setItem('jwt_token', token);
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('email', email);
  }
  public setUserDetail(name: string, email: string) {
    // console.log(token.valueOf());
    // this.storage.set('token', token);
    // console.log(this.storage.set('token', token));

    // window.localStorage.setItem('jwt_token', token);
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('email', email);
  }
  public getToken() {
   // tslint:disable-next-line: no-shadowed-variable
  //  const val = await this.storage.get('token').then((val) =>  {
    // console.log('Your age is', val);
  //  });
    return window.localStorage.getItem('jwt_token');
  }

  public destroyToken() {
    // this.storage.remove('token');
    window.localStorage.removeItem('jwt_token');
  }

  public getUserId() {
            // we are getting the user information
    // from the token
    const token = this.getToken();
    const decode = jwt_token(token);
    const userId = decode.id;
    return userId;
  }
  public getUserName() {
    return window.localStorage.getItem('name');
  }
  public getUserEmail() {
    return window.localStorage.getItem('email');
  }
  public setUserImage(image: string) {
    return window.localStorage.setItem('image', image );
  }
  public getUserImage() {
    return window.localStorage.getItem('image');
  }
}
