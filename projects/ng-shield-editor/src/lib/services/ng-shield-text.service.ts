/// <reference path="./fonts/fonts.d.ts" />
import { Service } from '@angular/core';
import type { NgShieldSettingsText } from '../ng-shield-settings';
import bungee from './fonts/bungee.ttf';
import jura from './fonts/jura.ttf';
import lobster from './fonts/lobster.ttf';
import luckiestGuy from './fonts/luckiest-guy.ttf';
import novaFlat from './fonts/nova-flat.ttf';
import openSans from './fonts/open-sans.ttf';
import overpass from './fonts/overpass.ttf';

interface FontFamilyOption {
  name: string;
  url?: string;
}

function fontToDataUri(font: Uint8Array): string {
  const chunkSize = 0x8000;
  let binary = '';

  for (let i = 0; i < font.length; i += chunkSize) {
    binary += String.fromCharCode(...font.subarray(i, i + chunkSize));
  }

  return `data:application/x-font-ttf;base64,${btoa(binary)}`;
}

@Service()
export class NgShieldTextService {
  public readonly paths = {
    arc: '<path %attrs% d="M 0 260 C 150 210 350 210 512 260" />',
    arcLower: '<path %attrs% d="M 0 260 C 150 310 350 310 512 260" />',
    rise: '<path %attrs% d="M 70 250 C 50 250 450 200 450 200" />',
    wave: '<path %attrs% d="M 50 250 C 200 200 300 300 450 250" />',
    circle: '<path %attrs% d="M 350 300 A 50 50 0 1 1 150 250 A 50 50 0 1 1 350 300" />'
  };

  private _fontFamilies: FontFamilyOption[] | undefined;

  public get fontFamilies(): FontFamilyOption[] {
    return (this._fontFamilies ??= [
      { name: 'Open Sans', url: fontToDataUri(openSans) },
      { name: 'Jura', url: fontToDataUri(jura) },
      { name: 'Nova Flat', url: fontToDataUri(novaFlat) },
      { name: 'Lobster', url: fontToDataUri(lobster) },
      { name: 'Overpass', url: fontToDataUri(overpass) },
      { name: 'Luckiest Guy', url: fontToDataUri(luckiestGuy) },
      { name: 'Bungee Outline', url: fontToDataUri(bungee) },
      { name: 'Arial' },
      { name: 'Verdana' },
      { name: 'Helvetica' },
      { name: 'Tahoma' },
      { name: 'Trebuchet MS' },
      { name: 'Times New Roman' },
      { name: 'Georgia' },
      { name: 'Garamond' },
      { name: 'Courier New' },
      { name: 'Brush Script MT' }
    ]);
  }

  public readonly defaultSettings: NgShieldSettingsText = {
    body: '',
    size: 4,
    fontFamily: this.fontFamilies[0].name,
    path: Object.keys(this.paths)[0],
    color: '#231F20',
    borderColor: null,
    borderSize: 2,
    x: 50,
    y: 39,
    spacing: 0
  };
}
