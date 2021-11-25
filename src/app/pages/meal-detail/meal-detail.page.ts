import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Meal } from '../../interfaces/meal.interface';
import { MealService } from '../../services/meal.service';

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.page.html',
    styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage implements OnInit {
    meal: Meal | null = null;
    loading: boolean = true;
    isFavorite: boolean = false;
    safeVideoUrl: SafeResourceUrl | null = null;

    constructor(
        private route: ActivatedRoute,
        private mealService: MealService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadMeal(id);
        }
    }

    async loadMeal(id: string) {
        this.loading = true;
        this.mealService.getMealById(id).subscribe(
            (meal) => {
                this.meal = meal;
                this.isFavorite = this.mealService.isFavorite(id);
                if (meal.strYoutube) {
                    const videoId = this.getYoutubeVideoId(meal.strYoutube);
                    if (videoId) {
                        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                            `https://www.youtube.com/embed/${videoId}`
                        );
                    }
                }
                this.loading = false;
            },
            (error) => {
                console.error('Error loading meal:', error);
                this.loading = false;
            }
        );
    }

    async toggleFavorite() {
        if (this.meal) {
            await this.mealService.toggleFavorite(this.meal.idMeal);
            this.isFavorite = this.mealService.isFavorite(this.meal.idMeal);
        }
    }

    private getYoutubeVideoId(url: string): string | null {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    }
} 