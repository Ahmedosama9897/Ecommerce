import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }

getAllBrands():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
}


}
