import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  view = true;

  formErrors = '';
  formSuccess = '';

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  loginFormLoading = false;
  registerFormLoading = false;

  constructor(public authService: AuthService, private routes: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      console.log(this.loginForm)
      return;
    }

    this.authService.loginUser(this.loginForm.value)
      .subscribe((res: any) => {
        if (res.message) {
          this.formSuccess = res.message;
        }
      }, (err: any) => {
        this.formErrors = err.error.error
      }
      
      )
  }

  registerUser(): void {
    if (this.registerForm.invalid) return;

    this.authService.createUser(this.registerForm.value)
      .subscribe((res: any) => {
        console.log(res);
      })
  }

}
