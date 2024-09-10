import { Ibrands } from './../../core/interfaces/ibrands';
import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NavBlankComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{

  private readonly _BrandService = inject(BrandService)

  brandList : Ibrands[] =[];

  ngOnInit(): void {
    this._BrandService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.brandList = res.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
