import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [],
})
export class FormComponent implements OnInit {
  public formNumber: string;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  // Gets the form number when clicked
  getForm(form: string) {
    this.formNumber = form.slice(45, 47);
    this.appService.formNumber = this.formNumber;
    // console.log(this.appService.formNumber);
  }

  // To print with ngFor form numbers on Form tab
  counter(i: number) {
    return new Array(i);
  }

  // To put 0 before single numbers
  fill(number, len) {
    number = number + 1;
    return '0'.repeat(len - number.toString().length) + number.toString();
  }
}
