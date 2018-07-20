import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient: HttpClient) { }
 
  searchHotels(objFilter : any) :Observable<any>{
    return this.httpClient.get(environment.baseUrl.concat('/hotels/'),{ params: objFilter });    
  }
}
