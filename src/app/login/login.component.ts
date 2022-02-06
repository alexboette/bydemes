import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  
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
  }

  getData() {
    const dbUsername = localStorage.getItem('username');
    const dbPassword = localStorage.getItem('password');
    if (this.username.value == dbUsername && this.password.value == dbPassword) {
      this.snackBar.open('Login successfull!', 'Accept', { 
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Username or password incorrect.', 'Accept', { duration: 5000 });
    }
  }


}
