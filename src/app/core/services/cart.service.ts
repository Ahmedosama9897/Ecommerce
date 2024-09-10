import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumber: WritableSignal<number> =signal(0)

  userId:WritableSignal<string> = signal('1')


  constructor(private _HttpClient:HttpClient){

    // effect(() =>{
    //   if(this.cartNumber() > 2){
    //     document.body.style.background = 'red'
    //   }
    // })

  };


  




  addProductToCart(id:string):Observable<any>{
 
     return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` ,
      {
        "productId" : id
      });
   }



   getProductCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
    
    )
   }
  
   deleteSpecificCatrItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,

    )
   }

   UpdateProductQuantity(id:string ,  newcount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count" : newcount 
      }

    )
   }

   ClearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/`,

    
    )
   }
}
