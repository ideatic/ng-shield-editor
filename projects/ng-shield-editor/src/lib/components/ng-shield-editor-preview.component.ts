import { Component, effect, ElementRef, inject, input } from '@angular/core';
import type { NgShieldSettings } from '../ng-shield-settings';
import { NgShieldBuilderService } from '../services/ng-shield-builder.service';

@Component({
  selector: 'ng-shield-editor-preview',
  template: '',
  styles: `
    :host {
      display: block;
      margin: 0 auto;
      text-align: center;
    }

    :host ::ng-deep svg {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  `
})
export class NgShieldEditorPreviewComponent {
  // Deps
  private _host = inject(ElementRef<HTMLElement>);
  private _generatorSvc = inject(NgShieldBuilderService);

  // Bindings
  public readonly settings = input<NgShieldSettings>();

  constructor() {
    effect(() => (this._host.nativeElement.innerHTML = this._generatorSvc.generateSVG(this.settings())));
  }
}
