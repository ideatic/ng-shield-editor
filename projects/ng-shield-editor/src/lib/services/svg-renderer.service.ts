import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class SvgRendererService {
  constructor(@Inject(DOCUMENT) private _document: Document) {
  }

  public renderBase64Image(svg: string, height?: number, width?: number, type = 'image/png'): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = this._document.createElement('img'); 
      
      img.onload = () => {
        const canvas = this._document.createElement('canvas');
        const ctx = canvas.getContext('2d'); // Esto lleva fuente, OJO! Creo que aqui esta el error (ctx.font)
        
        this._document.body.appendChild(canvas);
        
        if (height || width) {
          canvas.height = height;
          canvas.width = width;
          ctx.drawImage(img, 0, 0, width, height);
        } else {
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);   
        }

        const dataCanvas = canvas.toDataURL(type); // Error al convertir SVG a PNG
        resolve(dataCanvas); 
      };
      img.onerror = () => reject('Unable to load SVG');
      
      img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`; // https://stackoverflow.com/a/26603875/528065
      
      /* var svgBlob = new Blob([this.generateSVG(shield)], {type: 'image/svg+xml;charset=utf-8'});
       img.src =  URL.createObjectURL(svgBlob);*/
    });
  }
}


