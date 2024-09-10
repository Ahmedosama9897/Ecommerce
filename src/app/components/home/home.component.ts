import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Icategories } from '../../core/interfaces/icategories';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from './../../core/services/categories.service';
import { WishListService } from '../../core/services/wish-list.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, AsyncPipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, SlicePipe, CurrencyPipe, DatePipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _WishListService  =inject(WishListService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  


  productList: Iproduct[] = [];
  categoriesList: Icategories[] = [];

  text: string = "";

  getAllproductSub !: Subscription;

  datee = new Date();




  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,

    nav: true
  } 


  ngOnInit(): void {

    this._NgxSpinnerService.show('Loading-3')
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res); 
        this.categoriesList = res.data;
        this._NgxSpinnerService.hide('Loading-3')
        
      },
      error: (err) => {
        console.log(err);

      },

    })

    this.getAllproductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);

        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  ngOnDestroy(): void {

    this.getAllproductSub?.unsubscribe()

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
  addWish(id:string):void{
    this._WishListService.addProductToWish(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message , 'FreshCart')
        this._WishListService.WishNumber.set( res.count  )


        console.log(  this._WishListService.WishNumber() );
        
      },    
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
}