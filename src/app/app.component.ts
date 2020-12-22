import {Component} from '@angular/core';
import {NgShieldEditorService} from '../../projects/ng-shield-editor/src/lib/services/ng-shield-editor.service';
import {downloadData} from './download';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public settings = this._ngShieldSvc.defaultSettings;

  constructor(private _ngShieldSvc: NgShieldEditorService) {
  }

  public downloadSVG() {
    downloadData('shield.svg', this._ngShieldSvc.generateSVG(this.settings));
  }

  public downloadPNG() {
    this._ngShieldSvc.generateBase64PNG(this.settings);
  }
}
