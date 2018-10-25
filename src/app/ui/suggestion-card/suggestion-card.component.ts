import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.css']
})
export class SuggestionCardComponent implements OnInit {
  condition: string;
  city= "eldoret";

  constructor(public weather: WeatherService) { }

  ngOnInit() {
    this.weather.getWeatherState(this.city).subscribe((data: string) => {
        this.condition = data;
        console.log('swifi',this.condition);
      });
  }

}
