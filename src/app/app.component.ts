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

  public downloadPNG(size?: number) {
    this._ngShieldSvc.renderBase64Image(this.settings, size)
      .then((base64img) => {
        const downloadLink = document.createElement('a');
        downloadLink.download = 'shield.png';
        document.body.appendChild(downloadLink);
        downloadLink.href = base64img;

        setTimeout(() => {
          downloadLink.click();
          downloadLink.remove();
        });
      }).catch((err) => {
        console.log(err);
      });
  }
}
