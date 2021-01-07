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
    zoom:number;
  };
  symbol: {
    content: string,
    size: number,
    x: number,
    y: number,
    rotation: number;
    trim: boolean
  };
  text: {
    body: string;
    color: string;
    fontFamily: { name: string, url: string },
    borderColor: string;
    borderSize: number;
    size: number,
    x: number,
    y: number,
    spacing: number,
    path: string
  },
  gloss: boolean
}
