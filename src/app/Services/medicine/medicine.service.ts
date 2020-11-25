import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//
import { environment } from 'src/environments/environment';
import { Medicine, StoreMedicine } from 'src/app/models/schemas';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  /*
    Constants
    Objects
    Arrays
    */
  // readonly URL = 'http://localhost:3000/api';
  private readonly URL = environment.api_url;
  medicine: Medicine;
  MedicineArray: Medicine[];
  storeMedicineArray: StoreMedicine[];
  // Constructor
  constructor(private httpClient: HttpClient) {}


  /*
  API Call to save medicine
  of the related store
   */
  public addMedicine(body: Medicine): Observable<Medicine> {
    // const token = `bearer ` + this.jwt.getToken();
    // {headers: new HttpHeaders().set('Authorization', token)}
    return this.httpClient.post<Medicine>(this.URL + `/medicines`, body);
  }
  /*
    1-This is an API call to get
    all medicines available in
    inventory
    2-This is used for general purpose
    3-Medicine Details: _id, Name, Formula, Format, Ingredients
    */
  public getMedicines(): Observable<Medicine[]> {
    // const token = `bearer ` + this.jwt.getToken();
    // {headers: new HttpHeaders().set('Authorization', token)}
    return this.httpClient.get<Medicine[]>(this.URL + `/medicines`);
  }
  /*

   */
  public getSingleMedicine(id: string): Observable<Medicine> {
    return this.httpClient.get<Medicine>(this.URL + `/medicines//medicinebyid/${id}`);
  }
  /*
   1-This is an API call to get
   all medicines available on
   store by using store_Id
   2-This is used for specifice Store
   3-Medicine Details: _id, Name, Formula, Format, Ingredients, Quantity, Price
   */
  public getMedicinesByStoreId(id: string): Observable<any> {
    return this.httpClient.get(this.URL + `/medicines/${id}`);
  }

    /*
   1-This is an API call to delete
   all medicines available on
   store by using store_Id
   2-This is used for specifice Store
   3-Medicine Details: _id, Name, Formula, Format, Ingredients, Quantity, Price
   */
  public deleteMedicinesByStoreId(id: string): Observable<any> {
    return this.httpClient.delete(this.URL + `/medicines/${id}`);
  }

    /*
   1-This is an API call to delete
   a medicine available on
   store by using storeID and MedicineID
   2-This is used for specifice Store
   3-Medicine Details: _id, Name, Formula, Format, Ingredients, Quantity, Price
   */
  public deleteMedicineByStoreIdAndMedicineId(storeId: string, medicineId: string): Observable<any> {
    return this.httpClient.delete(this.URL + `/medicines/${storeId}/${medicineId}`);
  }
      /*
   1-This is an API call to delete
   a medicine available on
   store by using storeID and MedicineID
   2-This is used for specifice Store
   3-Medicine Details: _id, Name, Formula, Format, Ingredients, Quantity, Price
   */
  public updateMedicineByStoreIdAndMedicineId(storeId: string, medicineId: string, body: any): Observable<any> {
    return this.httpClient.put(this.URL + `/medicines/${storeId}/${medicineId}`, body);
  }
}
