import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorieDetailsPage } from './categorie-details.page';

const routes: Routes = [
  {
    path: '',
    component: CategorieDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieDetailsPageRoutingModule {}
