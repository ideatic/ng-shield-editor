import {Injectable} from '@angular/core';

@Injectable()
export class NgShieldSymbolService {
  public autoResizeImages: number | false = 1000; // Resize input files to 1000px to avoid performance bottlenecks

  public readonly available = [];
}
