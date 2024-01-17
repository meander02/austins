// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';



//   import { ApplicationRef } from '@angular/core';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .then((module) => {
//     const appRef = module.injector.get(ApplicationRef);
//     appRef.tick();
//   })
//   .catch(err => console.error(err));

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import '@angular/compiler';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
