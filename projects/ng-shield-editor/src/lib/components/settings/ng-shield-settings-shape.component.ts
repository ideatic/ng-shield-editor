import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgShieldSettings} from '../../ng-shield-settings';
import {noop} from 'rxjs';
import {NgShieldBuilderService} from '../../services/ng-shield-builder.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgShieldShapeService} from '../../services/ng-shield-shape.service';
import {imports} from "../imports";
import {ColorPickerComponent} from "../ui/color-picker.component";

@Component({
  selector: 'ng-shield-editor-settings-shape',
  standalone: true,
  imports: [imports, ColorPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shapes">
      <div *ngFor="let shape of shapeSvc.available | keyvalue: originalOrder"
           class="shape-thumb" [class.active]="shape.key == settings?.shape.id"
           (click)="onShapeSelected($any(shape.key))" [innerHTML]="shape.key | fn:getShapeThumbnail:this:settings"></div>
    </div>

    <ng-container *ngIf="settings">
      <mat-slide-toggle [(ngModel)]="settings.shape.stroke" (ngModelChange)="onChange()" i18n>Pintar borde</mat-slide-toggle>

      <mat-slide-toggle [(ngModel)]="settings.gloss" (ngModelChange)="onChange()" i18n>Gloss</mat-slide-toggle>

      <label>
        <ng-container i18n>Color</ng-container>
        <color-picker [(ngModel)]="settings.shape.color" (ngModelChange)="onChange()"/>
      </label>
    </ng-container>
  `,
  styles: [`
      :host {
        display: block;
        width: 100%;
      }

      .shapes {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        margin: -10px; /* https://twitter.com/devongovett/status/1244679626162450432 */

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
      }

      .shape-thumb {
        width: 75px;
        height: 75px;
        margin: 10px;
        padding: 5px;
        border-radius: 6px;
        background: #ebf0f6;
        outline: none;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .shape-thumb ::ng-deep svg {
        max-width: 100%;
        max-height: 100%;
      }

      .shape-thumb.active {
        border: 2px solid #3666c8;
      }

      mat-slide-toggle {
        display: block;
        margin: 5px 0;
      }
    `
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgShieldSettingsShapeComponent),
    multi: true
  }]
})
export class NgShieldSettingsShapeComponent implements ControlValueAccessor {
  public settings: NgShieldSettings;
  private _onChangeCallback: (v: any) => void = noop;

  constructor(protected shapeSvc: NgShieldShapeService,
              private _ngShieldSvc: NgShieldBuilderService,
              private _sanitizer: DomSanitizer) {
  }

  protected onShapeSelected(shapeID: string) {
    if (shapeID != this.settings.shape.id) {
      this.settings.shape.id = shapeID;
      this.settings = {...this.settings};
      this._onChangeCallback(this.settings);
    }
  }

  protected getShapeThumbnail(shapeID: string): SafeHtml | null {
    if (this.settings) {
      return this._sanitizer.bypassSecurityTrustHtml(this._ngShieldSvc.generateSVG({...this.settings, shape: {...this.settings.shape, id: shapeID}}));
    } else {
      return null;
    }
  }

  protected onChange() {
    this.settings = {...this.settings};
    this._onChangeCallback(this.settings);
  }

  protected originalOrder() {
    return 0;
  }

  /* ControlValueAccessor */
  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

    public registerOnTouched(): void {
    // No se utiliza
  }

  public writeValue(obj: any): void {
    this.settings = obj;
  }
}
