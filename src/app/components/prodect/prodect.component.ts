import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Icategories } from '../../core/interfaces/icategories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prodect',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, AsyncPipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, SlicePipe, CurrencyPipe, DatePipe, JsonPipe],
  templateUrl: './prodect.component.html',
  styleUrl: './prodect.component.css'
})
export class ProdectComponent  implements OnInit{

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  


  productList: Iproduct[] = [];
  categoriesList: Icategories[] = [];

  text: string = "";

  getAllproductSub !: Subscription;

  datee = new Date();


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
}
