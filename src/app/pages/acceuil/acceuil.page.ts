import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {
  listCatg={};
  listMeals=[]
  constructor(private mealService :MealService,public route: Router) { }

  ngOnInit() {
    this.getAllCategory()
    this.getTenMeals()
  }
  getAllCategory()
  {
    this.mealService.getAllCategory().subscribe((data)=>{
      this.listCatg=data;
    })
  }
  getTenMeals()
  {
    this.listMeals=this.mealService.getTenMeals();
  }
  getDetails(id)
  {
    this.route.navigate(['home/details', id]);
  }
  getCatgDetails(catg)
  {
    this.route.navigate(['home/categDetails', catg]);
  }
}
