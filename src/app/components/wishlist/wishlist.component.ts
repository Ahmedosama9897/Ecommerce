import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iwish } from '../../core/interfaces/iwish';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink , CurrencyPipe ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent  implements OnInit{
  
  private readonly _WishlistComponent = inject(WishListService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)

    
  wishDetails : Iwish[]   = []
  

  ngOnInit(): void {
    this._WishlistComponent.getProductWish().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishDetails = res.data

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:string):void{
    this._WishlistComponent.deleteSpecificWishItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishDetails = res.data 
        this._WishlistComponent.WishNumber.set(res.numOfwishItem)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  
  addWish(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.cartNumber.set( res.numOfwishItem  )


        console.log(  this._WishlistComponent.WishNumber );
        
      }
      
    })

    
  }

  
  addCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message , 'FreshCart')
        this._CartService.cartNumber.set( res.numOfCartItems  )


        console.log(  this._CartService.cartNumber() );
        
      },    
      error:(err)=>{
        console.log(err);
        
      }
    })  
  }

     
  // cartDetails : Icart  = {} as Icart;

  // ngOnInit(): void {
  //   this._CartService.getProductCart().subscribe({
  //     next:(res)=>{
  //       console.log(res.data);
  //       this.cartDetails = res.data

  //     },
  //     error:(err)=>{
  //       console.log(err);
        
  //     }
  //   })
  // }

  // removeItem(id:string):void{
  //   this._CartService.deleteSpecificCatrItem(id).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       this.cartDetails = res.data 
  //       this._CartService.cartNumber.set(res.numOfCartItems)
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //     }
  //   })
  // }

   
  // UpdateCount(id:string ,count:number):void{
  //   this._CartService.UpdateProductQuantity(id ,count).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       this.cartDetails = res.data 
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //     }
  //   })
  // }

  // ClearItem():void{
  //   this._CartService.ClearCart().subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       if (res.message == 'success') {
  //         this.cartDetails = {} as Icart
  //         this._CartService.cartNumber.set(0)
  //       }
        
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //     }
  //   })
  // }
  
  // addCart(id:string):void{
  //   this._CartService.addProductToCart(id).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       this._ToastrService.success(res.message , 'FreshCart')
  //       this._CartService.cartNumber.set( res.numOfCartItems  )


  //       console.log(  this._CartService.cartNumber() );
        
  //     },    
  //     error:(err)=>{
  //       console.log(err);
        
  //     }
  //   })
  // }


  }



