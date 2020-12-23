export interface NgShieldSettings {
  shape: string;
  motif: string;
  symbol: {
    content: string,
    size: number,
    x: number,
    y: number,
    trim: boolean
  };
  color1: string;
  color2: string;
  color3: string;
  stroke: boolean;
  text: {
    body: string;
    color: string;
    fontFamily: { name: string, url: string },
    borderColor: string;
    borderSize: number;
    size: number,
    x: number,
    y: number,
    path: string
  },
  gloss:boolean
}
