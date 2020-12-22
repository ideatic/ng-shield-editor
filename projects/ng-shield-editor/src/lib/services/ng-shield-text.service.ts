import {Injectable} from '@angular/core';

@Injectable()
export class NgShieldTextService {

  public readonly fontFamilies = [
    {name: 'Open Sans', url: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'},
    {name: 'Jura', url: 'https://fonts.googleapis.com/css2?family=Jura&display=swap'},
    {name: 'Nova Flat', url: 'https://fonts.googleapis.com/css2?family=Nova+Flat'},
    {name: 'Lobster', url: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap'},
    {name: 'Overpass', url: 'https://fonts.googleapis.com/css2?family=Overpass&display=swap'},
    {name: 'Luckiest Guy', url: 'https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap'},
    {name: 'Bungee Outline', url: 'https://fonts.googleapis.com/css2?family=Bungee+Outline&display=swap'}
  ];

  public readonly paths = {
    bent: '<path %attrs% d="M80.2,238.8c132.872-27.024,210.536-27.727,351.578,0" />'
  };
}
