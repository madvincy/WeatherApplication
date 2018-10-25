import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  
  condition: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  darkMode: boolean;
   city = 'Eldoret';
   hum: number;
  wind: number;
  tod: string;
  state: string;
  constructor(public weather: WeatherService,
              public router: Router,
              ) {
  }

  ngOnInit() {
    

    this.weather.getWeatherState(this.city)
      .subscribe((data: string) => {
        this.condition = data;
        console.log (data, 'data get weather state');
      });
      this.weather.getWeather(this.city).subscribe(res => {
        console.log (res ,'ryt');
        this.tod=res;
      var state = res.state.main;
       console.log(state,'status');
        });
        
        this.weather.getWeatherState(this.city).subscribe((state) => this.state = state);
  
  }

  ngOnDestroy() {

  }

  openDetails() {
    this.router.navigateByUrl('/details/'+this.city);
  }

}
