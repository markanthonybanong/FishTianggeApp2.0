import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  public isLogin: boolean = false;
  
  public form = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private formBuilder: FormBuilder) { }
}
