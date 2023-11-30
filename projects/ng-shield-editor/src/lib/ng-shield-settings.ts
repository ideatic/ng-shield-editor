export interface NgShieldSettings {
  shape: {
    id: any;
    color: string;
    stroke: boolean;
  };
  motif: {
    id: any;
    color: string;
    x: number;
    y: number;
    zoom: number;
  };
  symbol: NgShieldSettingsSymbol[];
  text: NgShieldSettingsText[],
  gloss: boolean
}

export interface NgShieldSettingsText {
  body: string;
  color: string;
  fontFamily: string;
  borderColor: string;
  borderSize: number;
  size: number,
  x: number,
  y: number,
  spacing: number,
  path: string
}

export interface NgShieldSettingsSymbol {
  content: string,
  size: number,
  x: number,
  y: number,
  rotation: number;
  trim: boolean;
  color?: string;
}
