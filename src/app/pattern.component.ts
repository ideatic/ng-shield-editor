import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styles: [],
})
export class PatternComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit(): void {}

  getFormPattern() {
    if (!this.appService.formNumber) {
      return (this.appService.formNumber = '01');
    } else {
      return this.appService.formNumber; // clicked form number
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  fill(number, len) {
    number = number + 1;
    return '0'.repeat(len - number.toString().length) + number.toString();
  }
}
