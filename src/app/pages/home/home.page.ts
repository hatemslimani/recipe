import { Component, OnInit } from '@angular/core';
import { Category, Meal } from '../../interfaces/meal.interface';
import { MealService } from '../../services/meal.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    searchTerm: string = '';
    meals: Meal[] = [];
    categories: Category[] = [];
    randomMeal: Meal | null = null;
    loading: boolean = false;

    constructor(private mealService: MealService) { }

    ngOnInit() {
        this.loadCategories();
        this.getRandomMeal();
    }

    async loadCategories() {
        this.mealService.getCategories().subscribe(
            (categories) => {
                this.categories = categories;
            },
            (error) => {
                console.error('Error loading categories:', error);
            }
        );
    }

    async getRandomMeal() {
        this.mealService.getRandomMeal().subscribe(
            (meal) => {
                this.randomMeal = meal;
            },
            (error) => {
                console.error('Error loading random meal:', error);
            }
        );
    }

    async searchMeals() {
        if (this.searchTerm.trim()) {
            this.loading = true;
            this.mealService.searchMeals(this.searchTerm).subscribe(
                (meals) => {
                    this.meals = meals;
                    this.loading = false;
                },
                (error) => {
                    console.error('Error searching meals:', error);
                    this.loading = false;
                }
            );
        }
    }

    async refreshRandomMeal() {
        this.getRandomMeal();
    }
} 