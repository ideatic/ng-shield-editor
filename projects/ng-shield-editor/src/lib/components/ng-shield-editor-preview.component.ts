import {ChangeDetectionStrategy, Component, ElementRef, inject, OnChanges, input} from "@angular/core";
import {NgShieldBuilderService} from '../services/ng-shield-builder.service';
import {NgShieldSettings} from '../ng-shield-settings';

@Component({
  selector: 'ng-shield-editor-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styles: `
    :host {
      display: block;
      text-align: center;
      margin: 0 auto;
    }

    :host ::ng-deep svg {
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: 0 auto;
    }
  `
})
export class NgShieldEditorPreviewComponent implements OnChanges {
  // Deps
  private _host = inject(ElementRef<HTMLElement>);
  private _generatorSvc = inject(NgShieldBuilderService);

  // Bindings
  public readonly settings = input<NgShieldSettings>(undefined);

  public ngOnChanges() {
    this._host.nativeElement.innerHTML = this._generatorSvc.generateSVG(this.settings());
  }
}
