import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { WeatherService } from './services/weather/weather.service';
import{ Customer} from '../app/customer'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  addcity: string;
  showMenu = false;
  customers: Customer[];

  constructor( public router: Router, public weather: WeatherService) {
    

  }

  ngOnInit() {
    
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  search(){
    this.router.navigateByUrl('/details/'+this.addcity);
    

  }
  getCustomers() {
    return this.weather.getCustomers()
               .subscribe(
                 customers => {
                  console.log('magsahgdhas',customers);
                  this.customers = customers
                 }
                );
 }
}
