import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges} from '@angular/core';
import {NgShieldBuilderService} from '../services/ng-shield-builder.service';
import {NgShieldSettings} from '../ng-shield-settings';

@Component({
  selector: 'ng-shield-editor-preview',
  standalone: true,
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgShieldEditorPreviewComponent implements OnChanges {
  @Input() public settings: NgShieldSettings;

  constructor(private _host: ElementRef<HTMLElement>,
              private _generatorSvc: NgShieldBuilderService) {
  }

  public ngOnChanges() {
    this._host.nativeElement.innerHTML = this._generatorSvc.generateSVG(this.settings);
  }
}
