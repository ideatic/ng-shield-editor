import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnChanges
} from '@angular/core';
import { NgShieldSettings } from '../ng-shield-settings';
import { NgShieldBuilderService } from '../services/ng-shield-builder.service';

@Component({
  selector: 'ng-shield-editor-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class NgShieldEditorPreviewComponent implements OnChanges {
  // Deps
  private _host = inject(ElementRef<HTMLElement>);
  private _generatorSvc = inject(NgShieldBuilderService);

  // Bindings
  public readonly settings = input<NgShieldSettings>();

  public ngOnChanges() {
    this._host.nativeElement.innerHTML = this._generatorSvc.generateSVG(
      this.settings()
    );
  }
}
