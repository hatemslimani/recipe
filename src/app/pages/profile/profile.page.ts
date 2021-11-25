import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MealService } from '../../services/meal.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    username: string = '';
    email: string = '';
    bio: string = '';
    profileImage: string = '';
    isOnline: boolean = true;
    favoriteCount: number = 0;
    cookingHours: number = 0;
    rating: number = 0;
    darkMode: boolean = false;
    notifications: boolean = true;
    language: string = 'en';
    latestAchievement: string = 'Master Chef Level 1';

    constructor(
        private alertController: AlertController,
        private mealService: MealService
    ) { }

    ngOnInit() {
        this.loadUserProfile();
    }

    async loadUserProfile() {
        // Mock data - Replace with actual API calls
        this.username = 'John Doe';
        this.email = 'john.doe@example.com';
        this.bio = 'Passionate about cooking and discovering new recipes!';
        this.favoriteCount = await this.mealService.getFavoriteCount();
        this.cookingHours = 12;
        this.rating = 4.8;
    }

    async editProfile() {
        const alert = await this.alertController.create({
            header: 'Edit Profile',
            inputs: [
                {
                    name: 'username',
                    type: 'text',
                    value: this.username,
                    placeholder: 'Username'
                },
                {
                    name: 'bio',
                    type: 'textarea',
                    value: this.bio,
                    placeholder: 'Bio'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Save',
                    handler: (data) => {
                        this.username = data.username;
                        this.bio = data.bio;
                    }
                }
            ]
        });
        await alert.present();
    }

    async changeProfilePicture() {
        // Implement image picker functionality
        console.log('Change profile picture');
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark', this.darkMode);
    }

    toggleNotifications() {
        // Implement notifications toggle logic
        console.log('Notifications:', this.notifications);
    }

    changeLanguage() {
        // Implement language change logic
        console.log('Language changed to:', this.language);
    }

    async editDietaryPreferences() {
        const alert = await this.alertController.create({
            header: 'Dietary Preferences',
            inputs: [
                {
                    type: 'checkbox',
                    label: 'Vegetarian',
                    value: 'vegetarian',
                },
                {
                    type: 'checkbox',
                    label: 'Vegan',
                    value: 'vegan',
                },
                {
                    type: 'checkbox',
                    label: 'Gluten-Free',
                    value: 'gluten-free',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Save',
                    handler: (data) => {
                        console.log('Selected preferences:', data);
                    }
                }
            ]
        });
        await alert.present();
    }

    shareProfile() {
        // Implement profile sharing functionality
        console.log('Share profile');
    }

    viewAchievements() {
        // Implement achievements view
        console.log('View achievements');
    }

    shareApp() {
        // Implement app sharing functionality
        console.log('Share app');
    }

    rateApp() {
        // Implement app rating functionality
        console.log('Rate app');
    }

    openGitHub() {
        window.open('https://github.com/yourusername/recipe-app', '_blank');
    }

    exportData() {
        // Implement data export functionality
        console.log('Export data');
    }

    async clearFavorites() {
        const alert = await this.alertController.create({
            header: 'Clear Favorites',
            message: 'Are you sure you want to clear all your favorites?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Clear',
                    role: 'destructive',
                    handler: () => {
                        this.mealService.clearFavorites();
                        this.favoriteCount = 0;
                    }
                }
            ]
        });
        await alert.present();
    }

    async logout() {
        const alert = await this.alertController.create({
            header: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Logout',
                    role: 'destructive',
                    handler: () => {
                        // Implement logout logic
                        console.log('Logout');
                    }
                }
            ]
        });
        await alert.present();
    }
} 