import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from '../../interfaces/meal.interface';
import { MealService } from '../../services/meal.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
    categoryName: string = '';
    meals: Meal[] = [];
    loading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private mealService: MealService
    ) { }

    ngOnInit() {
        this.categoryName = this.route.snapshot.paramMap.get('name') || '';
        if (this.categoryName) {
            this.loadCategoryMeals();
        }
    }

    private loadCategoryMeals() {
        this.loading = true;
        this.mealService.filterByCategory(this.categoryName).subscribe(
            (meals) => {
                this.meals = meals;
                this.loading = false;
            },
            (error) => {
                console.error('Error loading category meals:', error);
                this.loading = false;
            }
        );
    }
} 