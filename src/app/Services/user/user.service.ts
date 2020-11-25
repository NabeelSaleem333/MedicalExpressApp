import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart } from '../../models/schemas';
import { JwtService } from 'src/app/core/services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /*
    Constants
    Objects
    Arrays
    */
  cart: Cart;
  // readonly URL = 'http://localhost:3000/api';
  private readonly URL = environment.api_url;
  // Constructor
  constructor(private jwtServ: JwtService, private httpClient: HttpClient) {}

  public authenticate(body: Cart): Observable<any> {
    return this.httpClient.post(this.URL + '/cart', body);
  }
  /*
  A function to get the user details from the server
  */
  public getUser(id: string): Observable<any> {
    const token = `bearer ` + this.jwtServ.getToken();
    console.log(this.jwtServ.getToken());
    //
    return this.httpClient.get(this.URL + `/users/getuser/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }
  /*
  A function to update the user information
  */
  public updateUser(id: string, body: any): Observable<any> {
    const token = `bearer ` + this.jwtServ.getToken();
    console.log(this.jwtServ.getToken());
    //
    return this.httpClient.put(this.URL + `/users/${id}`, body, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }
  /* A function to verify the old password and set the new password
for the existing user */
  public verifyPassword(userId: string, body: any): Observable<any> {
    console.log('In service, verify password: ', body);
    return this.httpClient.post(
      this.URL + `/users/verifypassword/${userId}`,
      body
    );
  }
}
