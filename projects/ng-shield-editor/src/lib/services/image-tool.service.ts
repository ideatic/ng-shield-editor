import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class ImageToolService {
  constructor(@Inject(DOCUMENT) private _document: Document) {
  }

  public svgToBase64Image(svg: string, height?: number, width?: number, type = 'image/png'): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = this._document.createElement('img');

      img.onload = () => {
        setTimeout(() => { // Allow some time to load external resources
          const canvas = this._document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (height || width) {
            canvas.height = height;
            canvas.width = width;
            ctx.drawImage(img, 0, 0, width, height);
          } else {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
          }

          resolve(canvas.toDataURL(type));
        }, 50);

        /* if (URL?.revokeObjectURL) {
           URL.revokeObjectURL(img.src);
         }*/
      };
      img.onerror = () => reject('Unable to load SVG');

      /*  if (URL?.createObjectURL) {
          const svgBlob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
          img.src = URL.createObjectURL(svgBlob);
        } else {*/
      img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`; // https://stackoverflow.com/a/26603875/528065
      //  }
    });
  }

  public resizeImage(dataUri: string, maxSize: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = this._document.createElement('img');
      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width >= height && width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        } else { // early exit; no need to resize
          return resolve(dataUri);
        }

        const canvas = this._document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.height = height;
        canvas.width = width;
        ctx.drawImage(image, 0, 0, width, height);

        resolve(canvas.toDataURL());
      };
      image.onerror = () => reject('Unable to load image');
      image.src = dataUri;
    });
  }
}
