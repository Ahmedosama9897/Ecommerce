import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  WishNumber: WritableSignal<number> =signal(0)

  userId:WritableSignal<string> = signal('1')


constructor(private _HttpClient:HttpClient){

effect(() => {

  if(this.WishNumber() > 0){
    document.body.style.backgroundColor = 'red'
  }


   // effect(() =>{
    //   if(this.cartNumber() > 2){
    //     document.body.style.backgroundColor ='red'
    //   }
    // })

})

}


  userwishList:string[] = []

  
  addProductToWish(id:string):Observable<any>{
 
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist` ,
     {
       "productId" : id
     });

  }



  getProductWish():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`
    
    )
   }

   
   deleteSpecificWishItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,

    )
   }






}
