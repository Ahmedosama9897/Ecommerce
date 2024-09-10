import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);


  msgSuccess:boolean =false;

  msgError: string = "";
  isLoading: boolean = false;

  x: FormGroup = new FormGroup({
    userName: new FormControl(null),
    userAge: new FormControl(null)
  });



  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, { validators: this.confirmpassword })







  confirmpassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }


  registerSub !: Subscription

  dataForm = {
    name: 'Ahmed osama',
    email: 'ahmedosama250@gmail.com',
    phone:'01157543949',
    
  }

  ngOnInit():void {
    this.registerForm.patchValue({
      name : this.dataForm.name,
      email : this.dataForm.email,
      phone : this.dataForm.phone,
      
    })
  }


  regietrSubmit(): void {

    if (this.registerForm.valid) {
      this.isLoading = true;
    this.registerSub =  this._AuthService.setregisterForm(this.registerForm.value).subscribe({
        next: (res) => {

          console.log(res);

          if (res.message == 'success') {
            this.msgSuccess =true ;
            setTimeout(() => {
              this._Router.navigate(['/login'])

            },1000)
          }

          this.isLoading = true;

        }, 

        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message
          console.log(err);
          this.isLoading = false;

        }

      })

    }
    else {
      this.registerForm.setErrors({ mismatch: true })
      this.registerForm.markAllAsTouched()
    }

  }

  ngOnDestroy():void{
      this.registerSub?.unsubscribe()
  }

}
