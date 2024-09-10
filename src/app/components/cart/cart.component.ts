import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/inerfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
    
cartDetails : Icart  = {} as Icart;

  ngOnInit(): void {
    this._CartService.getProductCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:string):void{
    this._CartService.deleteSpecificCatrItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data 
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

   
  UpdateCount(id:string ,count:number):void{
    this._CartService.UpdateProductQuantity(id ,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data 
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ClearItem():void{
    this._CartService.ClearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if (res.message == 'success') {
          this.cartDetails = {} as Icart
          this._CartService.cartNumber.set(0)
        }
        
      },
      error:(err)=>{
        console.log(err);
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


  }
