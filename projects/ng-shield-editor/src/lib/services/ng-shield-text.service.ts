import {Injectable} from '@angular/core';

@Injectable()
export class NgShieldTextService {

  public readonly fontFamilies = [
    {name: 'Open Sans', url: 'https://fonts.googleapis.com/css2?family=Open+Sans'},
    {name: 'Jura', url: 'https://fonts.googleapis.com/css2?family=Jura'},
    {name: 'Nova Flat', url: 'https://fonts.googleapis.com/css2?family=Nova+Flat'},
    {name: 'Lobster', url: 'https://fonts.googleapis.com/css2?family=Lobster'},
    {name: 'Overpass', url: 'https://fonts.googleapis.com/css2?family=Overpass'},
    {name: 'Luckiest Guy', url: 'https://fonts.googleapis.com/css?family=Luckiest+Guy'},
    {name: 'Bungee Outline', url: 'https://fonts.googleapis.com/css2?family=Bungee+Outline'}
  ];

  public readonly paths = {
    bent: '<path %attrs% d="M 0 260 C 150 210 350 210 512 260" />',
    bent2: '<path %attrs% d="M 0 260 C 150 310 350 310 512 260" />',
    bent3: '<path %attrs% d="M 70 250 C 50 250 450 200 450 200" />',
    bent4: '<path %attrs% d="M 50 250 C 200 200 300 300 450 250" />'
  };
}
