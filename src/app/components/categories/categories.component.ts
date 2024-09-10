import { Component, inject, OnInit } from '@angular/core';
import { Icategories } from '../../core/interfaces/icategories';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent  implements OnInit {

  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)

  categoriesList: Icategories[] = [];


  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList = res.data;
  },
  error: (err) => {
    console.log(err);
    }

   })

  }
 }




  
  // counter : WritableSignal<number>  = signal(0) ;

  // userName: WritableSignal<string> = signal('ahmed') ;

  // changeCounter():void{
  //   this.counter.update((value)=> value + 1);
  // }
  
  
  // changeName():void{
  //   this.userName.set( 'ali'  );
  // }


