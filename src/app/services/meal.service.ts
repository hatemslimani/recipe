import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Area, Category, Ingredient, Meal } from '../interfaces/meal.interface';

@Injectable({
    providedIn: 'root'
})
export class MealService {
    private API_URL = 'https://www.themealdb.com/api/json/v1/1';
    private favorites: string[] = [];
    private storage: Storage | null = null;

    constructor(
        private http: HttpClient,
        private storageService: Storage
    ) {
        this.init();
    }

    async init() {
        const storage = await this.storageService.create();
        this.storage = storage;
        this.favorites = await this.storage.get('favorites') || [];
    }

    searchMeals(term: string): Observable<Meal[]> {
        return this.http.get<any>(`${this.API_URL}/search.php?s=${term}`).pipe(
            map(response => this.processMeals(response.meals || []))
        );
    }

    getMealById(id: string): Observable<Meal> {
        return this.http.get<any>(`${this.API_URL}/lookup.php?i=${id}`).pipe(
            map(response => this.processMeals(response.meals || [])[0])
        );
    }

    getRandomMeal(): Observable<Meal> {
        return this.http.get<any>(`${this.API_URL}/random.php`).pipe(
            map(response => this.processMeals(response.meals || [])[0])
        );
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<any>(`${this.API_URL}/categories.php`).pipe(
            map(response => response.categories || [])
        );
    }

    getAreas(): Observable<Area[]> {
        return this.http.get<any>(`${this.API_URL}/list.php?a=list`).pipe(
            map(response => response.meals || [])
        );
    }

    filterByCategory(category: string): Observable<Meal[]> {
        return this.http.get<any>(`${this.API_URL}/filter.php?c=${category}`).pipe(
            map(response => this.processMeals(response.meals || []))
        );
    }

    filterByArea(area: string): Observable<Meal[]> {
        return this.http.get<any>(`${this.API_URL}/filter.php?a=${area}`).pipe(
            map(response => this.processMeals(response.meals || []))
        );
    }

    private processMeals(meals: any[]): Meal[] {
        return meals.map(meal => {
            const ingredients: Ingredient[] = [];

            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim()) {
                    ingredients.push({
                        name: ingredient.trim(),
                        measure: measure ? measure.trim() : ''
                    });
                }
            }

            return {
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strCategory: meal.strCategory,
                strArea: meal.strArea,
                strInstructions: meal.strInstructions,
                strMealThumb: meal.strMealThumb,
                strTags: meal.strTags,
                strYoutube: meal.strYoutube,
                ingredients
            };
        });
    }

    async toggleFavorite(mealId: string) {
        const index = this.favorites.indexOf(mealId);
        if (index === -1) {
            this.favorites.push(mealId);
        } else {
            this.favorites.splice(index, 1);
        }
        await this.storage?.set('favorites', this.favorites);
    }

    isFavorite(mealId: string): boolean {
        return this.favorites.includes(mealId);
    }

    async getFavorites(): Promise<string[]> {
        if (!this.storage) return [];
        return await this.storage.get('favorites') || [];
    }

    async getFavoriteCount(): Promise<number> {
        const favorites = await this.getFavorites();
        return favorites.length;
    }

    async addToFavorites(mealId: string) {
        if (!this.storage) return;
        const favorites = await this.getFavorites();
        if (!favorites.includes(mealId)) {
            favorites.push(mealId);
            await this.storage.set('favorites', favorites);
        }
    }

    async removeFromFavorites(mealId: string) {
        if (!this.storage) return;
        const favorites = await this.getFavorites();
        const index = favorites.indexOf(mealId);
        if (index > -1) {
            favorites.splice(index, 1);
            await this.storage.set('favorites', favorites);
        }
    }

    async clearFavorites() {
        if (!this.storage) return;
        await this.storage.set('favorites', []);
    }

    async isFavoritePromise(mealId: string): Promise<boolean> {
        const favorites = await this.getFavorites();
        return favorites.includes(mealId);
    }
} 