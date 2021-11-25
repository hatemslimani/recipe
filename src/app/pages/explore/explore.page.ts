import { Component, OnInit } from '@angular/core';
import { Area, Meal } from '../../interfaces/meal.interface';
import { MealService } from '../../services/meal.service';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
    areas: Area[] = [];
    selectedArea: string = '';
    meals: Meal[] = [];
    loading: boolean = false;
    slideOpts = {
        slidesPerView: 3,
        // spaceBetween: 1,
        freeMode: true
    };

    constructor(private mealService: MealService) { }

    ngOnInit() {
        this.loadAreas();
    }

    loadAreas() {
        this.mealService.getAreas().subscribe(
            (areas) => {
                this.areas = areas;
                if (areas.length > 0) {
                    this.selectArea(areas[0].strArea);
                }
            },
            (error) => {
                console.error('Error loading areas:', error);
            }
        );
    }

    selectArea(area: string) {
        this.selectedArea = area;
        this.loading = true;
        this.mealService.filterByArea(area).subscribe(
            (meals) => {
                this.meals = meals;
                this.loading = false;
            },
            (error) => {
                console.error('Error loading meals:', error);
                this.loading = false;
            }
        );
    }
} 