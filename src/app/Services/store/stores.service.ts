import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/core/services/jwt.service';
//
import { environment } from 'src/environments/environment';
import { Store } from 'src/app/models/schemas';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  /*
   Objects
   Arrays
  */
  // readonly URL = 'http://localhost:3000/api';
  private readonly URL = environment.api_url;
  store: Store;
  storeArray: Store[];
  //
  constructor(private httpclient: HttpClient, private jwtServ: JwtService) {}
  /*
  This an API call to create new store
  */
  public createNewStore(body: Store): Observable<Store> {
    return this.httpclient.post<Store>(this.URL + `/stores`, body);
  } // End
    /*
  This an API call to create new store
  */
 public editStore(id: string, body: any): Observable<Store> {
  console.log(id);
  return this.httpclient.put<Store>(this.URL + `/stores/${id}`, body);
} // End
/*
 */

public deleteStore(userId: string): Observable<Store> {
 return this.httpclient.delete<Store>(this.URL + `/stores/${userId}`);
} // End
  /*
   This is an API call to get all stores record
 */
  public async getAllStores(): Promise<any> {
    // const token = `bearer ` + this.jwtServ.getToken();
    // console.log(this.jwtServ.getToken());
    // , {headers: new HttpHeaders().set('Authorization', token)}
    return this.httpclient.get(this.URL + `/stores`);
  }

  /*
  PUBLIC PURPOSE
  This is an API call to get One Store Record
  By using store ID
  */
  public getStoreById(storeId: string): Observable<Store> {
    return this.httpclient.get<Store>(this.URL + `/stores/${storeId}`);
  }

  /*
  SPECIFIC PURPOSE
  This is an API call to get One Store Record
  By using User ID
  */
 public getStoreByUserId(userId: string): Observable<Store> {
  return this.httpclient.get<Store>(this.URL + `/stores/user/${userId}`);
}
  /*
  This is an API call to get One Store Record
  By using store ID
  */
  public getStoresByMedicineId(id: string): Observable<any> {
    console.log(id);
    return this.httpclient.get<any>(
      this.URL + `/stores/getstores/${id}`
    );
  }
}
