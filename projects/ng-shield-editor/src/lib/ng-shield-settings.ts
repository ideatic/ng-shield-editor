export interface NgShieldSettings {
  shape: string;
  motif: string;
  symbol: string;
  color1: string;
  color2: string;
  color3: string;
  stroke: boolean;
  text: {
    body: string;
    color: string;
    fontFamily: { name: string, url: string },
    size: number,
    offsetX: number,
    offsetY: number,
    path: string
  }
}
