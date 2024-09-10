import { log } from 'console';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)


    step:number = 1;
  
  verifyemail:FormGroup = new FormGroup({
      email : new FormControl(null , [Validators.required , Validators.email])
  })



  verifycode:FormGroup = new FormGroup({
      resetCode : new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)])
  })
  
  resetPassword:FormGroup = new FormGroup({
      email : new FormControl(null , [Validators.required , Validators.email]),
      newPassord: new FormControl ( [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],)
  })


  verifyemailSubmit():void{
    this._AuthService.setEmailverify( this.verifyemail.value ).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg === 'success'){
            this.step = 2;
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  verifycodeSubmit():void{
    this._AuthService.setEmailverify( this.verifycode.value ).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg === 'Success'){
            this.step = 3;
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
  
  
  
  verifyPassordSubmit():void{
    this._AuthService.setResetpassword( this.resetPassword.value ).subscribe({
      next:(res)=>{
        console.log(res);
        
        localStorage.setItem('userToken' ,res.token)

        this._AuthService.saveUserData()

        this._Router.navigate(['/home'])


      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }



}
