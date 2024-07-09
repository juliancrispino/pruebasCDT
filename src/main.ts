import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if(!navigator.geolocation){
  alert('Geolocalizacion no soportaada por navegador.');
  throw new Error('Navegador no soporta la geolocalizacion')
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
