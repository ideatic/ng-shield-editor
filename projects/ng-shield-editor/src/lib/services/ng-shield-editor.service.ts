import {Inject, Injectable} from '@angular/core';
import {NgShieldSettings} from '../ng-shield-settings';
import {NgShieldShapeService} from './ng-shield-shape.service';
import {NgShieldMotifService} from './ng-shield-motif.service';
import {NgShieldTextService} from './ng-shield-text.service';
import {DOCUMENT} from '@angular/common';
import {NgShieldSymbolService} from './ng-shield-symbol.service';
import {ImageToolService} from './image-tool.service';
import {gloss} from './gloss';
import {randomString} from './libs/random-str';
import {escapeXML} from './libs/xml';

@Injectable()
export class NgShieldEditorService {
  public readonly defaultSettings: NgShieldSettings = {
    shape: {
      id: 'bwgShield',
      color: '#C90800',
      stroke: true
    },
    motif: {
      id: 'lineH',
      color: '#FFFFFF',
      x: 50,
      y: 50,
      zoom: 100
    },
    text: [this._textSvc.defaultSettings],
    symbol: {
      content: null,
      x: 50,
      y: 50,
      size: 50,
      rotation: 0,
      trim: true
    },
    gloss: true
  };

  constructor(
    private _shapeSvc: NgShieldShapeService,
    private _motifSvc: NgShieldMotifService,
    private _symbolSvc: NgShieldSymbolService,
    private _textSvc: NgShieldTextService,
    private _renderer: ImageToolService,
    @Inject(DOCUMENT) private _document: Document
  ) {
  }

  public generateSVG(settings: NgShieldSettings): string {
    const idSuffix = randomString(16);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Shape clipping mask -->
        <defs>
          <clipPath id="bg-${idSuffix}">
             ${this._getShape(settings, false)}
          </clipPath>
        </defs>

        <!-- Background shape -->
        ${this._getShape(settings, true)}

        <!-- Motif -->
        ${this._getMotif(settings, idSuffix)}

        <!-- Symbol -->
        ${this._getSymbol(settings, idSuffix)}

        <!-- Text -->
        ${this._getText(settings, idSuffix)}

        <!-- Gloss effect -->
        ${settings.gloss ? gloss.replace('%attrs%', `clip-path="url(#bg-${idSuffix})"`).replace(/%id%/g, idSuffix) : ''}
      </svg>
    `;
  }

  private _getShape(settings: NgShieldSettings, includeExtra: boolean): string {
    // Definir atributos
    let shapeAttrs = `fill="${settings.shape.color}"`;
    const extraAttrs = shapeAttrs;

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

  private _getMotif(settings: NgShieldSettings, idSuffix: string): string {
    const motifContent = this._motifSvc.available[settings.motif.id];

    if (!motifContent) {
      return '';
    }

    let motifAttrs = `fill="${settings.motif.color}"`;

    const transforms = [];
    if (settings.motif.x != 50 || settings.motif.y != 50) {
      transforms.push(`translate(${512 / 100 * (settings.motif.x - 50)}, ${512 / 100 * (settings.motif.y - 50)})`);
    }

    if (settings.motif.zoom != 100) {
      transforms.push(`scale(${settings.motif.zoom / 100})`);
    }

    if (transforms.length) {
      motifAttrs += ` transform="${transforms.join(' ')}" style="transform-origin: center" transform-origin="center"`;
    }

    return `<g clip-path="url(#bg-${idSuffix})">${motifContent.replace(/%attrs%/g, motifAttrs)}</g>`;
  }

  private _getText(settings: NgShieldSettings, isSuffix: string): string {
    if (!settings.text?.length) {
      return '';
    }

    let svg = '';

    for(const text of settings.text){
      // Fuente
      if (text.fontFamily?.url) {
        svg += `<style>
@font-face {
    font-family: ${text.fontFamily.name};
    src: url(${text.fontFamily.url}) format('truetype');
}
</style>`;
      }

      // Forma
      const useTextPath = text.path && this._textSvc.paths[text.path];
      const textPathID = `text-path-${text.path}-${isSuffix}`;

      if (useTextPath) {
        svg += `<defs>${this._textSvc.paths[text.path].replace(/%attrs%/g, `id="${textPathID}"`)}</defs>`;
      }

      svg +=
        `<text
          ${useTextPath ? '' : 'x="50%" y="50%" letter-spacing="0" dominant-baseline="middle" text-anchor="middle"'}
          fill="${escapeXML(text.color)}"
          font-weight="bold"
          font-family="${escapeXML(text.fontFamily?.name || '')}"
          font-size="${text.size * 15}"
          letter-spacing="${text.spacing}"
          transform="translate(${512 / 100 * (text.x - 50)}, ${512 / 100 * (text.y - 50)})"
          ${text.borderColor && text.borderSize ? `stroke="${text.borderColor}" stroke-width="${text.borderSize}"` : ''}
        >${useTextPath
          ? `<textPath xlink:href="#${textPathID}" text-anchor="middle" startOffset="50%">${escapeXML(text.body)}</textPath>`
          : escapeXML(text.body)
        }</text>`;
    }

    return svg;
  }

  private _getSymbol(settings: NgShieldSettings, idSuffix: string): string {
    // Definir imagen
    if (!settings.symbol?.content) {
      return '';
    }
    let image = `<image %attrs% href="${settings.symbol.content}"/>`;

    // Calcular atributos
    const imageSize = 512 * (settings.symbol.size * 0.01);
    let cssAttrs = [`width: ${settings.symbol.size}%`];
    let attrs = `x="${512 / 100 * settings.symbol.x - imageSize / 2}" y="${512 / 100 * settings.symbol.y - imageSize / 2}"`;

    const shapeData = this._shapeSvc.available[settings.shape.id];

    if (settings.symbol.rotation != 0) {
      cssAttrs.push('transform-box: fill-box');
      cssAttrs.push('transform-origin: center');
      cssAttrs.push(`transform: rotate(${settings.symbol.rotation}deg)`);
    }

    image = image.replace('%attrs%', attrs + ` style="${cssAttrs.join('; ')}"`);

    // Máscara de recorte
    const isNoBgShape = typeof shapeData == 'object' && !shapeData.main;
    if (settings.symbol.trim && !isNoBgShape) {
      image = `<g clip-path="url(#bg-${idSuffix})">${image}</g>`;
    }

    return image;
  }

  public renderBase64Image(shield: NgShieldSettings, size?: number, type = 'image/png'): Promise<string> {
    return this._renderer.svgToBase64Image(this.generateSVG(shield), size, size, type);
  }
}
