import {FormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FnPipe} from "./ui/fn.pipe";
import {DecimalPipe, KeyValuePipe} from "@angular/common";

export const imports = [
  DecimalPipe,
  KeyValuePipe,
  FormsModule,
  // Material
  MatTabsModule,
  MatButtonModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatInputModule,
  // Tools
  FnPipe
] as const;
