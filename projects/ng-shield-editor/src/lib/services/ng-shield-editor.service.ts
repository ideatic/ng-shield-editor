import {Inject, Injectable} from '@angular/core';
import {NgShieldSettings} from '../ng-shield-settings';
import {NgShieldShapeService} from './ng-shield-shape.service';
import {NgShieldMotifService} from './ng-shield-motif.service';
import {NgShieldTextService} from './ng-shield-text.service';
import {DOCUMENT} from '@angular/common';
import {NgShieldSymbolService} from './ng-shield-symbol.service';
import {SvgRendererService} from './svg-renderer.service';
import {gloss} from './gloss';

@Injectable()
export class NgShieldEditorService {
  public readonly defaultSettings: NgShieldSettings = {
    shape: {
      id: 'bwgShield',
      color: '#C90800',
      stroke: true
    },
    motif: {
      id: 'cross',
      color: '#FFFFFF',
      x: 50,
      y: 50
    },
    text: {
      body: '',
      size: 4,
      fontFamily: this._textSvc.fontFamilies[0],
      path: Object.keys(this._textSvc.paths)[0],
      color: '#231F20',
      borderColor: null,
      borderSize: 2,
      x: 50,
      y: 39
    },
    symbol: {
      content: null,
      x: 50,
      y: 50,
      size: 50,
      trim: true
    },
    gloss: true
  };

  constructor(
    private _shapeSvc: NgShieldShapeService,
    private _motifSvc: NgShieldMotifService,
    private _symbolSvc: NgShieldSymbolService,
    private _textSvc: NgShieldTextService,
    private _renderer: SvgRendererService,
    @Inject(DOCUMENT) private _document: Document
  ) {
  }

  public generateSVG(settings: NgShieldSettings): string {

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Mascara de recorte del motivo -->
        <defs>
          <clipPath id="bg${settings.shape.id}">
             ${this._getShape(settings, false)}
          </clipPath>
        </defs>

        <!-- Fondo -->
        ${this._getShape(settings, true)}

        <!-- Motivo -->
        ${this._getMotif(settings)}

        <!-- Símbolo -->
        ${this._getSymbol(settings)}

        <!-- Texto -->
        ${this._getText(settings)}

        <!-- Gloss -->
        ${settings.gloss ? gloss.replace('%attrs%', `clip-path="url(#bg${settings.shape.id})"`) : ''}
      </svg>
    `;
  }

  private _getShape(settings: NgShieldSettings, includeExtra: boolean): string {
    // Definir atributos
    let shapeAttrs = `fill="${settings.shape.color}"`;
    let extraAttrs = shapeAttrs;

    if (settings.shape.stroke) {
      shapeAttrs += ` stroke="${settings.motif.color}" stroke-width="8"`;
    }

    // Obtener cuerpo
    const shapeData = this._shapeSvc.available[settings.shape.id];

    let shapeSvg: string;
    if (typeof shapeData == 'string') {
      shapeSvg = shapeData.replace(/%attrs%/g, shapeAttrs);
    } else {
      shapeSvg = shapeData.main.replace(/%attrs%/g, shapeAttrs);

      if (includeExtra) {
        shapeSvg += shapeData.extra.replace(/%attrs%/g, extraAttrs);
      }
    }

    return shapeSvg;
  }

  private _getMotif(settings: NgShieldSettings): string {
    let motifAttrs = `fill="${settings.motif.color}"`;

    let svg = '';
    if (settings.motif.x != 50 || settings.motif.y != 50) { // Usar máscara de recorte desplazada
      motifAttrs += ` clip-path="url(#motifBg${settings.shape.id})"`
        + ` transform="translate(${512 / 100 * (settings.motif.x - 50)}, ${512 / 100 * (settings.motif.y - 50)})"`;

      svg += `<defs>
          <clipPath id="motifBg${settings.shape.id}" transform="translate(${-512 / 100 * (settings.motif.x - 50)}, ${-512 / 100 * (settings.motif.y - 50)})">
             ${this._getShape(settings, false)}
          </clipPath>
        </defs>`;
    } else { // Usar máscara de recorte normal
      motifAttrs += ` clip-path="url(#bg${settings.shape.id})"`;
    }

    return svg + this._motifSvc.available[settings.motif.id].replace(/%attrs%/g, motifAttrs);
  }

  private _getText(settings: NgShieldSettings): string {
    if (!settings.text) {
      return '';
    }

    let svg = '';

    // Fuente
    if (settings.text.fontFamily?.url) {
      svg += `<style type="text/css">
@font-face {
 font-family: ${settings.text.fontFamily.name};
  src: url(${settings.text.fontFamily.url}) format('truetype');
                }
              </style>`;
    }

    // Forma
    const useTextPath = settings.text.path && this._textSvc.paths[settings.text.path];
    const textPathID = 'text-path-' + settings.text.path;

    if (useTextPath) {
      svg += `<defs>${this._textSvc.paths[settings.text.path].replace(/%attrs%/g, `id="${textPathID}"`)}</defs>`;
    }


    // x="${512 / 100 * settings.symbol.x}" y="${512 / 100 * settings.symbol.y - imageSize / 2}"

    return svg +
      `<text
          ${useTextPath ? '' : 'x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"'}
          fill="${this._escape(settings.text.color)}"
          font-weight="bold"
          font-family="${this._escape(settings.text.fontFamily?.name || '')}"
          font-size="${settings.text.size * 15}"
          transform="translate(${512 / 100 * (settings.text.x - 50)}, ${512 / 100 * (settings.text.y - 50)})"
          ${settings.text.borderColor && settings.text.borderSize ? `stroke="${settings.text.borderColor}" stroke-width="${settings.text.borderSize}"` : ''}
        >${useTextPath
        ? `<textPath xlink:href="#${textPathID}" text-anchor="middle" startOffset="50%">${this._escape(settings.text.body)}</textPath>`
        : this._escape(settings.text.body)
      }</text>`;
  }

  private _getSymbol(settings: NgShieldSettings): string {
    // Definir imagen
    if (!settings.symbol?.content) {
      return '';
    }
    let image = `<image %attrs% href="${settings.symbol.content}"/>`;

    // Calcular atributos
    const imageSize = 512 * (settings.symbol.size * 0.01);
    let attrs = `x="${512 / 100 * settings.symbol.x - imageSize / 2}" y="${512 / 100 * settings.symbol.y - imageSize / 2}" `
      + `style="width: ${settings.symbol.size}%"`;

    const shapeData = this._shapeSvc.available[settings.shape.id];
    const isNoBgShape = typeof shapeData == 'object' && !shapeData.main;
    if (settings.symbol.trim && !isNoBgShape) {
      attrs += `  clip-path="url(#bg${settings.shape.id})"`;
    }

    image = image.replace('%attrs%', attrs);

    return image;
  }

  private _escape(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  public renderBase64Image(shield: NgShieldSettings, size?: number, type = 'image/png'): Promise<string> {
    return this._renderer.renderBase64Image(this.generateSVG(shield), size, size, type);
  }
}


