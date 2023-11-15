
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortalRoutingModule } from './portal-routing.module';
import { HomeViews } from './views/home/home.views';
import { NotFondViews } from './views/not-fond/not-fond.views';
import { DetailViews } from './views/detail/detail.views';
import { AboutViews } from './views/about/about.views';
import { PortalComponent } from './portal.component';
import { PortalCommonsModule } from './commons/commons.module';
import { PoliticaPrivView } from './views/politica-priv/politica-priv.view';
import { AcercaDeView } from './views/acerca-de/acerca-de.view';
import { PoliticaCookiesView } from './views/politica-cookies/politica-cookies.view';
import { TerminosCondicionesView } from './views/terminos-condiciones/terminos-condiciones.view';


// import { ErrorInterceptor } from 'src/app/shared/interceptor/error.interceptor';

@NgModule({
  declarations: [HomeViews, NotFondViews, DetailViews, AboutViews,PortalComponent, PoliticaPrivView, AcercaDeView, PoliticaCookiesView, TerminosCondicionesView],
  imports: [CommonModule, PortalRoutingModule,PortalCommonsModule],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  // ],
})
export class PortalModule {}
