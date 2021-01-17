import {Injectable} from '@angular/core';

@Injectable()
export class NgShieldSymbolService {
  public autoResizeImages: number | false = 1000; // Resize input files to 1000px to avoid performance bottlenecks
  public allowSymbolUpload = true;

  public readonly available = [
    // Estrellas
'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MC4xODMiIGhlaWdodD0iMTguMTgyIiB2aWV3Qm94PSIwIDAgNTAuMTgzIDE4LjE4MiI+PHRpdGxlPkFzc2V0IDE8L3RpdGxlPjxwb2x5Z29uIHBvaW50cz0iMjUuOTM4IDAgMjguODkyIDUuOTg1IDM1LjQ5NyA2Ljk0NSAzMC43MTggMTEuNjA0IDMxLjg0NiAxOC4xODIgMjUuOTM4IDE1LjA3NiAyMC4wMzEgMTguMTgyIDIxLjE1OSAxMS42MDQgMTYuMzggNi45NDUgMjIuOTg0IDUuOTg1IDI1LjkzOCAwIiBmaWxsPSIjMDAwYjFjIi8+PHBvbHlnb24gcG9pbnRzPSI0My44NTIgMy4wNjkgNDUuODA4IDcuMDM0IDUwLjE4MyA3LjY2OSA0Ny4wMTggMTAuNzU1IDQ3Ljc2NSAxNS4xMTMgNDMuODUyIDEzLjA1NiAzOS45MzggMTUuMTEzIDQwLjY4NiAxMC43NTUgMzcuNTIgNy42NjkgNDEuODk1IDcuMDM0IDQzLjg1MiAzLjA2OSIgZmlsbD0iIzAwMGIxYyIvPjxwb2x5Z29uIHBvaW50cz0iNi4zMzIgMy4wNjkgOC4yODggNy4wMzQgMTIuNjYzIDcuNjY5IDkuNDk4IDEwLjc1NSAxMC4yNDUgMTUuMTEzIDYuMzMyIDEzLjA1NiAyLjQxOCAxNS4xMTMgMy4xNjYgMTAuNzU1IDAgNy42NjkgNC4zNzUgNy4wMzQgNi4zMzIgMy4wNjkiIGZpbGw9IiMwMDBiMWMiLz48L3N2Zz4='
  ];
}
