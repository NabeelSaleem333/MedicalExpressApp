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
}
