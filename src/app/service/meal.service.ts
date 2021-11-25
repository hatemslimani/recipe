import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  uri:string='https://www.themealdb.com/api/json/v1/1/';
  uri2:string='https://restcountries.com/v3.1/name/';
  constructor(private http :HttpClient) { }
  getAllCategory()
  {
    return this.http.get(this.uri+'list.php?c=list');
  }
  getTenMeals()
  {
    let meals=[]
    let m;
    let i=0
    for(let i=0;i<10;i++){
    this.http.get(this.uri+'random.php').subscribe((data)=>{
      m=data
      if(meals.indexOf(m.meals[0])==-1)
      {
        meals.push(m.meals[0])
      }
    })
    }
    return meals;
  }
  getDetails(id)
  {
    return this.http.get(this.uri+'lookup.php?i='+id);
  }
  getCategorysDetails()
  {
    return this.http.get(this.uri+'categories.php');
  }
  getMealsByCatg(name)
  {
    return this.http.get(this.uri+'filter.php?c='+name);
  }
  getCountrieFlag()
  {
    let listNames;
    this.http.get(this.uri+'list.php?a=list').subscribe((data)=>{
      listNames=data;
      listNames=listNames.meals;
      for (let index = 0; index < listNames.length; index++) {
        console.log(listNames[index]);
            
      }
    })
  }
}
