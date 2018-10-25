import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import { City } from '../../weather'
import{ Customer} from '../../customer'
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;
  customers: Customer[];

  today: string;

 
  citie='eldoret';
  forecast=[];
  submitted = false;


  customer = new Customer();
 
 

 

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
      
        
   this.weather.getWeatherState(this.city).subscribe((state) => this.state = state);
      
     

      this.weather.getForecast(this.city || this.citie).subscribe((data: any) => {
        console.log('forecast',data);
        for (let i = 0; i < data.list.length; i+=8) {
          // console.log('cast',data.list[i]);
          this.forecast.push(data.list[i+4]);
          
         
        }
      });

    });
   
  }
  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
  }

 addCustomer() {
   this.submitted = true;
   this.save();
 }

  

  private save(): void {
    console.log(this.customer);
    this.weather.addCustomer(this.customer,)
        .subscribe();
  }
  getCustomers() {
    return this.weather.getCustomers()
               .subscribe(
                 customers => {
                  console.log(customers);
                  this.customers = customers
                 }
                );
 }

}
