import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilPage } from '../pages/acceuil/acceuil.page';
import { CategorieDetailsPage } from '../pages/categorie-details/categorie-details.page';
import { DetailsPage } from '../pages/details/details.page';
import { SearchPage } from '../pages/search/search.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {path:'all', component:AcceuilPage},
      {path:'details/:id', component:DetailsPage},
      {path:'search', component:SearchPage},
      {path:'categDetails/:name', component:CategorieDetailsPage},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
