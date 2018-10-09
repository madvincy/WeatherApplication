import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {UiService} from '../../services/ui/ui.service';

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
      this.weather.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
      this.weather.getCurrentWind(this.city).subscribe((windspeed) => this.wind = windspeed);
      this.weather.getCurrentTemp(this.city).subscribe((data: number) => {
      this.currentTemp = data;
    });
    this.weather.getMinTemp(this.city).subscribe((data: number) => {
      this.minTemp = data;
    });
    this.weather.getMaxTemp(this.city).subscribe((data: number) => {
      this.maxTemp = data;
    });
  }

  ngOnDestroy() {

  }

  openDetails() {
    this.router.navigateByUrl('/details/'+this.city);
  }

}
