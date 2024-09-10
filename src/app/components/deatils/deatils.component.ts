import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { log } from 'console';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-deatils',
  standalone: true,
  imports: [],
  templateUrl: './deatils.component.html',
  styleUrl: './deatils.component.css'
})
export class DeatilsComponent implements OnInit {

  private readonly _ActivateRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);


  detailsProduct: Iproduct | null = null ;

  ngOnInit(): void {
    this._ActivateRoute.paramMap.subscribe({
      next:(p)=>{
          let idProduct = p.get('id') ;

          this._ProductsService.getSpecificProducts( idProduct ).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.detailsProduct =res.data;
            },
            error:(err)=>{
              console.log(err);
              
            }
          })
          
      }
    })
  }


}
