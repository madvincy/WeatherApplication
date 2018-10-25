import {Component, OnInit} from '@angular/core';

import { WeatherService } from '../../services/weather/weather.service';
import { Observable, Subject } from 'rxjs';
import {Router} from '@angular/router';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 import{ City } from '../../weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities$: Observable<City[]>;
  private searchTerms = new Subject<string>();
  addcity: "";
  
  constructor( private weatherservice: WeatherService, public router: Router) {

  }
  
  


  ngOnInit() {
   

  }
  search(){
    this.router.navigateByUrl('/details/'+this.addcity);
    

  }
  
}
