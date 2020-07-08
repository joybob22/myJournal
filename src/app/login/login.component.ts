import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ValidatePassword } from '../validators/password.validator';
import { matchingPasswords } from '../validators/passwordSame.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger(
      'slideDown', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0 }),
            animate('0.5s ease-out', 
                    style({ height: '220px' }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: '250px' }),
            animate('0.5s ease-in', 
                    style({ height: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'slideDownReg', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0 }),
            animate('0.5s ease-out', 
                    style({ height: '275px' }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: '275px' }),
            animate('0.5s ease-in', 
                    style({ height: 0 }))
          ]
        )
      ]
    )
  ]
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  registerForm: FormGroup;
  showLogin: Boolean = true;
  showRegister: Boolean = false;
  showSpinner: Boolean = false;
  error: Boolean = false;
  errorMessage: String;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ValidatePassword]]
    });
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ValidatePassword]],
      confirmPassword: ['', [Validators.required, ValidatePassword]]
    }, {validator: matchingPasswords('password', 'confirmPassword')})
  }

  toggleLogin(): void {
    this.showLogin = false;
    setTimeout(() => {
      this.showRegister = true;
    }, 500)
  }

  toggleRegister(): void {
    this.showRegister = false;
    setTimeout(() => {
      this.showLogin = true;
    }, 500)
  }

  login(): void {
    this.signInForm.markAllAsTouched();
    if(this.signInForm.status === "VALID") {
      this.showSpinner = true;
      this.authService.loginUser(this.signInForm.value.email, this.signInForm.value.password).then((err) => {
        if(err) {
          this.showSpinner = false;
          this.error = true;
          this.errorMessage = err.message;
        }
      });
    }
  }

  register(): void {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.status === "VALID") {
      this.showSpinner = true;
      this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password).then((err) => {
        if(err) {
          this.showSpinner = false;
          this.error = true;
          this.errorMessage = err.message;
        }
      });
    }
  }

}
