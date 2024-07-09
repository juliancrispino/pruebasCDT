import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
