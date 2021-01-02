import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges} from '@angular/core';
import {NgShieldEditorService} from '../services/ng-shield-editor.service';
import {NgShieldSettings} from '../ng-shield-settings';

@Component({
  selector: 'ng-shield-editor-preview',
  template: '',
  styles: [
    `
      :host {
        display: block;
        text-align: center;
        margin: 0 auto;
      }
    `
  ],
  // Este componente solo necesita activar el detector de cambios cuando cambia alguno de sus parámetros de entrada
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgShieldEditorPreviewComponent implements OnChanges {
  @Input() public settings: NgShieldSettings;

  constructor(private _host: ElementRef<HTMLElement>,
              private _generatorSvc: NgShieldEditorService) {
  }

  public ngOnChanges() {
    this._host.nativeElement.innerHTML = this._generatorSvc.generateSVG(this.settings);
  }
}
