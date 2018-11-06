import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  city: string;
  temp: string;
  hum: number;
  wind: number;
  statu: string;
  cit="eldoret";
  tod;
  state: string;
  forecast=[];
  state2: string;
  today: string;
  addcity= this.city;
  
  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService) {
   
  }
  
  ngOnInit() {
   


    const todayNumberInWeek = new Date().getDay();
    console.log(todayNumberInWeek);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    

    this.activeRouter.paramMap.subscribe((route: any) => {

      this.city =  this.addcity  || route.params.city;
       this.weather.getWeather(this.city).subscribe(res => {
        console.log (res ,'ryt');
        this.tod=res;
     
        });
      
        
   this.weather.getWeatherState(this.city).subscribe((state) => this.state = state);
      
     

      this.weather.getForecast(this.city || this.addcity).subscribe((data: any) => {
        console.log('forecast',data);
        this.forecast=[];
        for (let i = 0; i < data.list.length; i+=8) {
          console.log('STARTS HERE',data);
          console.log('fujo',data.list[i]);
          this.forecast.push(data.list[i+4]);
          
          var state2 = data.list[i].weather[0].main;
          console.log('papa',state2);
          this.state2 =state2;
          
          
         
        }
      });

    });

  }

  
 
}

