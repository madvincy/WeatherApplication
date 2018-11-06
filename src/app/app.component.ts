import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { WeatherService } from './services/weather/weather.service';
import{ Moodsactivity} from '../app/moodsactivity'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  addcity: string;
  showMenu = false;
  moodactivities: Moodsactivity[];

  constructor( public router: Router, public weather: WeatherService) {
    

  }

  ngOnInit() {
    this.getMoodactivities();
    
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  search(){
    this.router.navigateByUrl('/details/'+this.addcity);
    

  }
  getMoodactivities() {
    return this.weather.getMoodactivities()
               .subscribe(
                 moodactivities => {
                  console.log('magsahgdhas',moodactivities);
                  this.moodactivities = moodactivities
                 }
                );
 }
}
