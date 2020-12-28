import {Component} from '@angular/core';
import {NgShieldEditorService} from '../../projects/ng-shield-editor/src/lib/services/ng-shield-editor.service';
import {downloadData} from './download';
import {NgShieldSymbolService} from '../../projects/ng-shield-editor/src/lib/services/ng-shield-symbol.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public settings = this._ngShieldSvc.defaultSettings;

  constructor(private _ngShieldSvc: NgShieldEditorService,
              symbolSvc: NgShieldSymbolService) {
    // Los símbolos los define el consumidor de la librería
    symbolSvc.available.push('/assets/symbols/iron-man.png');
    symbolSvc.available.push('/assets/symbols/batman.png');
    symbolSvc.available.push('/assets/symbols/avengers.png');
    symbolSvc.available.push('/assets/symbols/captain-america.png');
    symbolSvc.available.push('/assets/symbols/bear.png');
    symbolSvc.available.push('/assets/symbols/dog.png');
    symbolSvc.available.push('/assets/symbols/fox.png');
    symbolSvc.available.push('/assets/symbols/puma.png');
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
