import { HomeComponent } from './../../components/home/home.component';
import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  
  wishNumber: WritableSignal<number> = signal(0)

  UserId:WritableSignal<number> = signal(1)


  constructor(private _HttpClient:HttpClient) {

    effect( ()=> {

      if(this.wishNumber() > 1 ){
        document.body.style.backgroundColor = 'red'
      }

      else if (this.wishNumber() > 2 ){
        document.body.style.backgroundColor = 'blue'
        
      }

    })
}
}


