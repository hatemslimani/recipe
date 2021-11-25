import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private mealsService:MealService) { }

  ngOnInit() {
    this.mealsService.getCountrieFlag();
  }

}
