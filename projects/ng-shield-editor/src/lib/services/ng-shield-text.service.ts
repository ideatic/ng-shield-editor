import {Injectable} from '@angular/core';
import {openSans} from './fonts/open-sans';
import {jura} from './fonts/jura';
import {novaFlat} from './fonts/nova-flat';
import {lobster} from './fonts/lobster';
import {bungee} from './fonts/bungee';
import {overpass} from './fonts/overpass';
import {luckiestGuy} from './fonts/luckiest-guy';

@Injectable()
export class NgShieldTextService {

  public readonly paths = {
    bent: '<path %attrs% d="M 0 260 C 150 210 350 210 512 260" />',
    bent2: '<path %attrs% d="M 0 260 C 150 310 350 310 512 260" />',
    bent3: '<path %attrs% d="M 70 250 C 50 250 450 200 450 200" />',
    bent4: '<path %attrs% d="M 50 250 C 200 200 300 300 450 250" />'
  };

  public readonly fontFamilies = [
    {name: 'Open Sans', url: openSans},
    {name: 'Jura', url: jura},
    {name: 'Nova Flat', url: novaFlat},
    {name: 'Lobster', url: lobster},
    {name: 'Overpass', url: overpass},
    {name: 'Luckiest Guy', url: luckiestGuy},
    {name: 'Bungee Outline', url: bungee}
  ];
}
