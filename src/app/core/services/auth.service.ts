import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, LoginRsp } from 'src/app/models/schemas';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Objects
  //
  constructor(private httpClient: HttpClient) {}
  public signup(body: any): Observable<LoginRsp> {
    console.log(body);
    // debugger;
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/users/signup`, body);
  }
  /*

  */
  public login(body: any): Observable<LoginRsp> {
    console.log(body);
    // debugger;
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/users/login`, body);
  }

  /* Verify Email Address
   */
  public verifyEmail(email: any): Observable<any> {
    console.log('Verify Email: ', email);
    return this.httpClient.post<any>(`${environment.api_url}/users/verify/email`, email);
  }
  /* Verify OTP Code
   */
  public verifyOTPCode(otpcode: any): Observable<any> {
    console.log('Verify otp-code: ', otpcode);
    return this.httpClient.post<any>(`${environment.api_url}/users/verify/otpcode`, otpcode);
  }
  /* Verify Password
   */
  public verifyPassword(email: any, password: any): Observable<any> {
    console.log('verify Password: ', email, password);
    return this.httpClient.get(`${environment.api_url}/users/verifypassword/${email}/${password}`);
  }
  /* Change Password
   */
  public changePassword(password: any): Observable<any> {
    console.log('change Password: ', password);
    return this.httpClient.put<any>(`${environment.api_url}/users/change/password`, password);
  }
  /* Change Image
   */
  public changeImage(body: any): Observable<any> {
    console.log('change Image: ', body);
    return this.httpClient.put<any>(`${environment.api_url}/users/change/image`, body);
  }
}
