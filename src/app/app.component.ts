import { Component } from '@angular/core';
import { NgShieldSettings } from '../../projects/ng-shield-editor/src/lib/ng-shield-settings';
import { NgShieldEditorService } from '../../projects/ng-shield-editor/src/lib/services/ng-shield-editor.service';
import { downloadData } from './download';

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

  constructor(private _ngShieldSvc: NgShieldEditorService) {}

  public downloadSVG() {
    downloadData('shield.svg', this._ngShieldSvc.generateSVG(this.settings));
  }

  public downloadPNG() {
    this._ngShieldSvc.generateBase64PNG(this.settings);
  }
}
