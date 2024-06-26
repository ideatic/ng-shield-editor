import {inject} from "@angular/core";
import {Component} from '@angular/core';
import {NgShieldBuilderService} from '../../projects/ng-shield-editor/src/lib/services/ng-shield-builder.service';
import {downloadData} from './download';
import {NgShieldSymbolService} from '../../projects/ng-shield-editor/src/lib/services/ng-shield-symbol.service';
import {HttpClient} from '@angular/common/http';
import {NgShieldSettings} from '../../projects/ng-shield-editor/src/lib/ng-shield-settings';


// eslint-disable-next-line
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _ngShieldSvc = inject(NgShieldBuilderService);

  public settings = this._ngShieldSvc.defaultSettings;

  constructor() {
    // Los símbolos los define el consumidor de la librería
    const symbols = [
      'assets/symbols/iron-man.png',
      'assets/symbols/batman.png',
      'assets/symbols/avengers.png',
      'assets/symbols/captain-america.png',
      'assets/symbols/bear.png',
      'assets/symbols/dog.png',
      'assets/symbols/fox.png',
      'assets/symbols/puma.png'
    ];

    const httpClient = inject(HttpClient);
    const symbolSvc = inject(NgShieldSymbolService);
    symbols.forEach(symbol => {
      httpClient.get(location.href + symbol, {responseType: 'blob'})
        .subscribe(image => {
          const reader = new FileReader();
          reader.addEventListener('load', () => symbolSvc.available.push(reader.result as string), false);
          reader.readAsDataURL(image);
        });
    });

    // Cargar escudo guardado
    const prevSessionShield = localStorage?.getItem('shield');
    if (prevSessionShield) {
      this.settings = {...this.settings, ...JSON.parse(prevSessionShield)};
    }
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

  public onShieldChange(settings: NgShieldSettings) {
    localStorage?.setItem('shield', JSON.stringify(settings));
  }
}

