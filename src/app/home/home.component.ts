import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  hide = true;
  loading = false;
  invalidAmount = false;
  value: number;
  amount: number;
  btc: number;
  transaction = new FormControl('', [Validators.required]);
  
  private REST_API_SERVER = "https://api.coinbase.com/v2/prices/spot?currency=EUR";
  
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.fetchValue();
    this.fetchDatabase();
  }

  fetchValue() {
    this.loading = true;
    this.httpClient.get(this.REST_API_SERVER).subscribe( value => {
      const currency = value as any;
      const data = currency.data;
      this.value = +data.amount;
      setTimeout( () => {
        this.loading = false;
      }, 1000);
    });
  }

  fetchDatabase() {
    const dbAmount = localStorage.getItem('amount');
    const dbBtc = localStorage.getItem('btc');
    this.amount = +dbAmount;
    this.btc = +dbBtc;
  }

  buyBtc() {
    if (this.amount >= this.transaction.value) {
      this.invalidAmount = false;
      let cuantityBtc = (this.transaction.value / this.value);
      this.amount = this.amount - (cuantityBtc * this.value);
      this.btc = this.btc + cuantityBtc;
      localStorage.setItem('amount', this.amount.toString());
      localStorage.setItem('btc', this.btc.toString());
      this.refresh();
    } else {
      this.invalidAmount = true;
    }
  }

  sellBtc() {
    let cuantityBtc = (this.transaction.value / this.value);
    if (this.btc >= cuantityBtc) {
      this.invalidAmount = false;
      this.amount = this.amount + ( cuantityBtc * this.value);
      this.btc = this.btc - cuantityBtc;
      localStorage.setItem('amount', this.amount.toString());
      localStorage.setItem('btc', this.btc.toString());
      this.refresh();
    } else {
      this.invalidAmount = true;
    }
  }


}
