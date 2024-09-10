import { Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DeatilsComponent } from './components/deatils/deatils.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
    {path:'' , component:AuthLayoutComponent , canActivate:[logedGuard] ,
        children:[
        {path:'' , redirectTo:'login' ,pathMatch:'full'},
        {path:'login' , component:LoginComponent},
        {path:'register' , component:RegisterComponent},
        {path:'forgot' , component:ForgotpasswordComponent},
    ]},
    {path:'' , component:BlankLayoutComponent , canActivate:[authGuard]  ,
        children:[
        {path:'' , redirectTo:'home' ,pathMatch:'full'},
        {path: 'home' , component:HomeComponent},

        {path: 'wishlist' , loadComponent:()=> import('./components/wishlist/wishlist.component').then((c)=> c.WishlistComponent  )},
        
        {path: 'products' , loadComponent:()=> import('./components/prodect/prodect.component').then((c)=> c.ProdectComponent  )},
       
        {path: 'cart' , loadComponent:()=> import('./components/cart/cart.component' ).then((c)=> c.CartComponent ) },
  
        {path: 'brands' , loadComponent:()=> import('./components/brands/brands.component').then((c)=> c.BrandsComponent)},
        {path: 'categories' , component:CategoriesComponent},
        {path: 'details/:id' , component:DeatilsComponent},
        {path: 'allorders' ,component:AllordersComponent },
        {path: 'orders/:id' ,component:OrdersComponent },
    ]},
    {path:'**' , component:NotfoundComponent}
];
