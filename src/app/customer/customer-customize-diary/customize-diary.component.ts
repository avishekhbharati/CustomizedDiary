import { Component, OnInit } from '@angular/core';
import { DiaryCustomizationData, PaperColorData } from '../../shared/DiaryCustomizationData';
import { CustomerService } from '../customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-customize-diary',
  templateUrl: './customer-customize-diary.component.html',
  styleUrls: ['./customer-customize-diary.component.scss']
})
export class CustomerCustomizeDiaryComponent implements OnInit {

  diaryCustomization: DiaryCustomizationData;
  selectedDiaryCustomization: any;
  numArr: number[] = [];
  basePrice: number = 0;
  price: number = 0;
  priceMap: any = new Object();;

  diaryForm = new FormGroup({
    coverText: new FormControl('', [Validators.required]),
    paperColor: new FormControl('', [Validators.required]),
    coverTheme: new FormControl('', [Validators.required]),
    paperType: new FormControl('', [Validators.required]),
    quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
  });

  get coverText() {
    return this.diaryForm.controls.coverText.value;
  }

  get paperColor() {
    return this.diaryForm.controls.paperColor.value;
  }

  get coverTheme() {
    return this.diaryForm.controls.coverTheme.value;
  }

  get paperType() {
    return this.diaryForm.controls.paperType.value;
  }

  get quantity() {
    return this.diaryForm.controls.quantity.value;
  }

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.priceMap['paperColor'] = 0;
    this.priceMap['coverTheme'] = 0;
    this.priceMap['paperType'] = 0;
    for (let i = 1; i < 22; i++) {
      this.numArr.push(i);
    }
    this.customerService.getDiaryCustomization().subscribe(data => {
      this.diaryCustomization = data[0];
      if (!this.diaryCustomization.customization.hasCoverText) {
        this.diaryForm.controls.coverText.disable();
      }
      this.price = data[0].basePrice;
      this.basePrice = data[0].basePrice;
    }, errorResponse => {
      alert(errorResponse.error.message);
    });
  }

  updatePrice(type: string, price: number) {
    this.priceMap[type] = price;
    this.price = this.quantity * (this.basePrice + this.priceMap['paperColor'] + this.priceMap['coverTheme'] + this.priceMap['paperType']);
  }

  checkout() {
    let diary = [
      {
        quantity: this.quantity,
        basePrice: this.price + this.paperColor.price + this.coverTheme.price + this.paperType.price,
        customizations: [
          {
            type: 'paperColor',
            name: this.paperColor.name
          },
          {
            type: 'coverTheme',
            name: this.coverTheme.name,
            image: this.coverTheme.image
          },
          {
            type: 'paperType',
            name: this.paperType.name,
          },
          {
            type: 'coverText',
            name: this.coverText,
          }
        ]
      }
    ];
    this.customerService.setDiaryDetails(diary);
    this.router.navigate(['/customer/checkout']);
  }
}
