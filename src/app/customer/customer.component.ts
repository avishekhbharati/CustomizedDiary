import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
    console.log("Customer Component");
  }

}