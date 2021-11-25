import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Meal } from '../../interfaces/meal.interface';
import { MealService } from '../../services/meal.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
    favoriteMeals: Meal[] = [];
    loading: boolean = true;

    constructor(
        private mealService: MealService,
        private alertController: AlertController
    ) { }

    ngOnInit() {
        this.loadFavorites();
    }

    async loadFavorites() {
        this.loading = true;
        const favoriteIds = await this.mealService.getFavorites();

        // Load each favorite meal details
        const mealPromises = favoriteIds.map(id =>
            this.mealService.getMealById(id).toPromise()
        );

        try {
            this.favoriteMeals = await Promise.all(mealPromises);
        } catch (error) {
            console.error('Error loading favorites:', error);
        }

        this.loading = false;
    }

    async removeFavorite(meal: Meal, event: Event) {
        event.stopPropagation();

        const alert = await this.alertController.create({
            header: 'Remove Favorite',
            message: `Are you sure you want to remove ${meal.strMeal} from favorites?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Remove',
                    handler: async () => {
                        await this.mealService.toggleFavorite(meal.idMeal);
                        await this.loadFavorites();
                    }
                }
            ]
        });

        await alert.present();
    }
} 