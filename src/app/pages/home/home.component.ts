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
  
  constructor( private Weatherservice: WeatherService, public router: Router) {

  }
  
  


  ngOnInit() {
    this.cities$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.Weatherservice.searchCities(term)),
    );

  }
  search(){
    this.router.navigateByUrl('/details/'+this.addcity);
    

  }
  
}
