import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorieDetailsPageRoutingModule } from './categorie-details-routing.module';

import { CategorieDetailsPage } from './categorie-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorieDetailsPageRoutingModule
  ],
  declarations: [CategorieDetailsPage]
})
export class CategorieDetailsPageModule {}
