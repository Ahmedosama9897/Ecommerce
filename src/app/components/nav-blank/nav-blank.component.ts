import { WishListService } from './../../core/services/wish-list.service';
import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive ],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent  implements OnInit{

   readonly _AuthService = inject(AuthService)
  private  readonly _CartService = inject(CartService)
  private  readonly _WishListService = inject(WishListService)



  
  countNumber: Signal<number> = computed ( ()=>  this._CartService.cartNumber() )
  countwishNumber: Signal<number> = computed ( ()=>  this._WishListService.WishNumber() )


   ngOnInit(): void {

    this._CartService.getProductCart().subscribe({
      next:(res)=>{
        console.log('cart items' ,  res);
        this._CartService.cartNumber.set(res.numOfCartItems)

        
      }
    })

    this._WishListService.getProductWish().subscribe({
      next:(res)=>{
        console.log('wish items' ,  res);
        this._WishListService.WishNumber.set(res.numOfCartItems)

        
      }
    })




   }
   

}
