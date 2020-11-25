import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private readonly URL = 'http://localhost:3000/api';
  private readonly URL = environment.api_url;
  // Constructor
  constructor(private httpClient: HttpClient) {}

  public placeOrder(body): Observable<any> {
    return this.httpClient.post(this.URL + '/orders', body);
  }
  public getOrder(userId): Observable<any> {
    return this.httpClient.get(this.URL + `/orders/${userId}`);
  }
  // Function to get seller orders type list
  public get_seller_order_list(userId: string, orderstatus: string): Observable<any> {
    console.log(userId, orderstatus);
    return this.httpClient.get(this.URL + `/orders/seller/${userId}/${orderstatus}`);
  }
  // Function to get seller orders type list
  public get_buyer_order_list(userId: string, orderstatus: string): Observable<any> {
    console.log(userId, orderstatus);
    return this.httpClient.get(this.URL + `/orders/buyer/${userId}/${orderstatus}`);
    }
  // Function to get seller orders type list
  public update_order_status(orderId: string, orderstatus: string): Observable<any> {
    console.log(orderId, orderstatus);
    return this.httpClient.get(this.URL + `/orders/update/${orderId}/${orderstatus}`);
  }
}
