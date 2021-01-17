import {Injectable} from '@angular/core';
import {NgShieldSettingsSymbol} from '../ng-shield-settings';
import {ImageToolService} from './image-tool.service';

@Injectable()
export class NgShieldSymbolService {
  public autoResizeImages: number | false = 1000; // Resize input files to 1000px to avoid performance bottlenecks
  public allowSymbolUpload = true;

  public readonly default = [
    // Estrella
    `<svg xmlns="http://www.w3.org/2000/svg" width="50.183" height="18.182" viewBox="0 0 50.183 18.182">
<polygon %attrs% points="25.938 0 28.892 5.985 35.497 6.945 30.718 11.604 31.846 18.182 25.938 15.076 20.031 18.182 21.159 11.604 16.38 6.945 22.984 5.985 25.938 0" />
</svg>`,

    // Estrellas
    `<svg xmlns="http://www.w3.org/2000/svg" width="50.183" height="18.182" viewBox="0 0 50.183 18.182">
<g %attrs%>
<polygon points="25.938 0 28.892 5.985 35.497 6.945 30.718 11.604 31.846 18.182 25.938 15.076 20.031 18.182 21.159 11.604 16.38 6.945 22.984 5.985 25.938 0" />
<polygon points="43.852 3.069 45.808 7.034 50.183 7.669 47.018 10.755 47.765 15.113 43.852 13.056 39.938 15.113 40.686 10.755 37.52 7.669 41.895 7.034 43.852 3.069"/>
<polygon points="6.332 3.069 8.288 7.034 12.663 7.669 9.498 10.755 10.245 15.113 6.332 13.056 2.418 15.113 3.166 10.755 0 7.669 4.375 7.034 6.332 3.069" />
</g>
</svg>`
  ]

  public available = [].concat(this.default);

  public readonly defaultSettings: NgShieldSettingsSymbol = {
    content: null,
    x: 50,
    y: 50,
    size: 50,
    rotation: 0,
    trim: true,
    color: '#000000'
  };

  constructor(private _imageSvc: ImageToolService) {
  }

  public isConfigurable(symbol: NgShieldSettingsSymbol): boolean {
    return symbol && symbol.content?.indexOf('<svg') === 0 && symbol.content.indexOf('%attrs%') >= 0;
  }

  public render(symbol: NgShieldSettingsSymbol): string {
    let content = symbol.content;

    if (this.isConfigurable(symbol)) {
      let attrs = `fill="${symbol.color}"`;
      content = content.replace(/%attrs%/g, attrs);
      content = this._imageSvc.svgToDataUri(content);
    }

    return content;
  }
}
