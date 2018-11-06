import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import { City } from '../../weather'
import{ Moodsactivity} from '../../moodsactivity'
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  city: string;
  state: string;
  weathere: string;
  weathered: string;
  temp: number;
  tempe: number;
  hum: number;
  wind: number;
  moodactivities: Moodsactivity[];
 

  today: string;
  tod;

 
  citie='eldoret';
  forecast=[];
  submitted = false;


  moodsactivity = new Moodsactivity();
 
 

 

  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService) {
  }

  ngOnInit() {
    this.forecast=[];
    

    
    

    

    this.activeRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city || this.citie;
      
      this.weather.getWeather(this.city).subscribe(res => {
        console.log (res ,'ryt');
        this.today=res;
      var state = res.state.main;
       console.log(state,'status');
        });
      
        
   this.weather.getWeatherState('Eldoret').subscribe((state) => {
     this.weathere = state;
     console.log("todajjy", this.weathere)
     this.moodsactivity.weathere=this.weathere;
   })
     

      this.weather.getForecast(this.city || this.citie).subscribe((data: any) => {
        console.log('forecast',data);
        for (let i = 0; i < data.list.length; i+=8) {
          // console.log('cast',data.list[i]);
          this.forecast.push(data.list[i+4]);
          
         
        }
      });

    });
    this.weather.getWeather(this.city).subscribe(res => {
      console.log (res ,'ryt');
      this.tod=res;
     console.log(this.tod.tempe,"expected temp");
     this.moodsactivity.tempe= this.tod.temp;
     this.moodsactivity.city=this.city;
      });
   
  }
  newMoodsactivities(): void {
    this.submitted = false;
    this.moodsactivity = new Moodsactivity();
  }

  addMoodactivities() {
   this.submitted = true;
   this.save();
 }

  

  private save(): void {
 
    this.weather.getWeatherState(this.city).subscribe((state) => this.weathered = state);
    this.weather.addMoodsactivity(this.moodsactivity)
        .subscribe();
        console.log(this.moodsactivity,'siasa');
  }
 

}
