import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AcceuilPageModule } from './pages/acceuil/acceuil.module';
import { DetailsPageModule } from './pages/details/details.module';
import { CategorieDetailsPageModule } from './pages/categorie-details/categorie-details.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,CommonModule,AcceuilPageModule,DetailsPageModule,CategorieDetailsPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
