import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id;
  meals;
  constructor(public router: ActivatedRoute,private mealsService:MealService,private domSanitizer: DomSanitizer) {
    this.router.params.subscribe(params => {
      this.id = params['id']; 
  });
   }

  ngOnInit() {
   this.getDetails()
  }
  
  getDetails()
  {
    this.mealsService.getDetails(this.id).subscribe((data)=>{
      let m
      m=data
      this.meals=m.meals[0];
    })
  }
  getVideo()
  {
    let p:string=this.meals.strYoutube
    p= p.replace('watch?v=','embed/')      
    return this.domSanitizer.bypassSecurityTrustResourceUrl(p)
  }
}
