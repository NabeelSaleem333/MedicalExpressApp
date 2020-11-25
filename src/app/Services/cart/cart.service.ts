import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Cart, StoreMedicine } from 'src/app/models/schemas';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  /*
    Constants
    Objects
    Arrays
    */
  cart: Cart;
  CartArray: StoreMedicine[];

  // private readonly URL = 'http://localhost:3000/api';
  private readonly URL = environment.api_url;
  // Constructor
  constructor(private httpClient: HttpClient) {}

  public addToCart(body: Cart): Observable<any> {
    return this.httpClient.post(this.URL + '/carts', body);
  }

  public loadcartonstores(userid: string): Observable<any> {
    return this.httpClient.get(this.URL + `/carts/cartonstores/${userid}`);
  }

  public loadCartForOneStore(storeId: string): Observable<any> {
    return this.httpClient.get(this.URL + `/carts/${storeId}`);
  }
  public cartCounter(userid: string): Observable<any> {
    return this.httpClient.get(this.URL + `/carts/count/${userid}`);
  }

  public updateCart(cartId: string, body: any): Observable<any> {
    return this.httpClient.put(this.URL + `/carts/update/${cartId}`, body);
  }

  public removeOneStoreCart(userId: string, storeId: string): Observable<any> {
    return this.httpClient.delete(
      this.URL + `/carts/delete/${userId}/${storeId}`
    );
  }

  public removeOneMedicineCart(cartId: string): Observable<any> {
    return this.httpClient.delete(
      this.URL + `/carts/delete/${cartId}`
    );
  }

  public placeOrder(userId: string, storeId: string, cart: any): Observable<any> {
    return this.httpClient.post(
      this.URL + `carts/test/${userId}/${storeId}`, cart
    );
  }
}
