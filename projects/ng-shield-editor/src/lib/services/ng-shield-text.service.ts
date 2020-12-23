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
    bent: '<path %attrs% d="M 100 250 C 150 200 350 200 400 250" />',
    bent2: '<path %attrs% d="M 50 175 C 100 240 400 240 450 175" />',
    bent3: '<path %attrs% d="M 70 250 C 50 250 450 200 450 200" />' 
  };
}
