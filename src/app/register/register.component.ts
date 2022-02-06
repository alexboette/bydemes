import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  amount = new FormControl('', [Validators.required]);

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.amount.hasError('required')) {
      return 'You must enter a value';
    }
  }

  setData() {
    if (!this.username.hasError('required') && !this.password.hasError('required') && !this.amount.hasError('required')) {
      localStorage.setItem('username', this.username.value);
      localStorage.setItem('password', this.password.value);
      localStorage.setItem('amount', this.amount.value);
      localStorage.setItem('btc', '0');
      this.snackBar.open('Account created successfully! Please login here.', 'Accept');
      this.router.navigate(['/login']);
    }
  }
 
  getData() {
      return localStorage.getItem('myData')
  }
 
  removeData(key) {
      localStorage.removeItem(key)
  }

}
