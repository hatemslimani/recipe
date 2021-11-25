import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from 'src/app/service/meal.service';
import { Location } from "@angular/common";


@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.page.html',
  styleUrls: ['./categorie-details.page.scss'],
})
export class CategorieDetailsPage implements OnInit {
  catgName;
  details;
  listMeals;
  constructor(public router: ActivatedRoute, private route: Router, private mealsService: MealService,private location:Location) {
    this.router.params.subscribe(params => {
      this.catgName = params['name'];
    });
  }
  ngOnInit() {
    this.getCategoriesDetails()
  }
  getCategoriesDetails() {
    return this.mealsService.getCategorysDetails().subscribe((data) => {
      this.details = data;
      this.details = this.details.categories
      this.details = this.details.find(e => e.strCategory == this.catgName)
      this.getMealsByCategory()
    })
  }
  getMealsByCategory() {
    this.mealsService.getMealsByCatg(this.catgName).subscribe((data) => {
      this.listMeals = data;
      this.listMeals = this.listMeals.meals
    })
  }
  getDetails(id) {
    this.route.navigate(['home/details', id]);
  }
  myBackButton(){
    this.location.back();
  }
}
