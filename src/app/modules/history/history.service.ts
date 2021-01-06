import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })

  export class HistoryService {

    history: History;
    private readonly URL = environment.api_url;

    constructor(private httpClient: HttpClient) {}

    public save(body: any): Observable<any> {
        return this.httpClient.post(this.URL + '/history/save', body);
    }
    public view(userId: string): Observable<any> {
        return this.httpClient.get(this.URL +   `/history/view/${userId}`);
    }
      public delete(userId: string): Observable<any> {
        return this.httpClient.delete(this.URL + `/history/delete/${userId}`);
    }
  }
