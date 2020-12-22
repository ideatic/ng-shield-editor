import { Component } from '@angular/core';
import { NgShieldSettings } from '../../projects/ng-shield-editor/src/lib/ng-shield-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public settings: NgShieldSettings = {
    shape: 0,
    motif: 0,
    symbol: 1,
    color1: '#c90800',
    color2: '#e5cb14',
    color3: '#231f20',
    stroke: true,
  };
}
