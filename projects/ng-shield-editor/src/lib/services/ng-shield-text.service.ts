import {Injectable} from '@angular/core';
import {openSans} from './fonts/open-sans';
import {jura} from './fonts/jura';
import {novaFlat} from './fonts/nova-flat';
import {lobster} from './fonts/lobster';
import {bungee} from './fonts/bungee';
import {overpass} from './fonts/overpass';
import {luckiestGuy} from './fonts/luckiest-guy';
import {NgShieldSettingsText} from '../ng-shield-settings';

@Injectable()
export class NgShieldTextService {

  public readonly paths = {
    arc: '<path %attrs% d="M 0 260 C 150 210 350 210 512 260" />',
    arcLower: '<path %attrs% d="M 0 260 C 150 310 350 310 512 260" />',
    rise: '<path %attrs% d="M 70 250 C 50 250 450 200 450 200" />',
    wave: '<path %attrs% d="M 50 250 C 200 200 300 300 450 250" />',
    circle: '<path %attrs% d="M 350 300 A 50 50 0 1 1 150 250 A 50 50 0 1 1 350 300" />'
  };

  public readonly fontFamilies = [
    {name: 'Open Sans', url: openSans},
    {name: 'Jura', url: jura},
    {name: 'Nova Flat', url: novaFlat},
    {name: 'Lobster', url: lobster},
    {name: 'Overpass', url: overpass},
    {name: 'Luckiest Guy', url: luckiestGuy},
    {name: 'Bungee Outline', url: bungee},
    {name: 'Arial'},
    {name: 'Verdana'},
    {name: 'Helvetica'},
    {name: 'Tahoma'},
    {name: 'Trebuchet MS'},
    {name: 'Times New Roman'},
    {name: 'Georgia'},
    {name: 'Garamond'},
    {name: 'Courier New'},
    {name: 'Brush Script MT'}
  ];

  public readonly defaultSettings: NgShieldSettingsText = {
    body: '',
    size: 4,
    fontFamily: this.fontFamilies[0],
    path: Object.keys(this.paths)[0],
    color: '#231F20',
    borderColor: null,
    borderSize: 2,
    x: 50,
    y: 39,
    spacing: 0
  };
}
