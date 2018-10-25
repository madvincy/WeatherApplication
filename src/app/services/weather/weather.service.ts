import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, Observable, of, observable } from 'rxjs';
import { City } from '../../weather';
import { moodactivity } from '../../moodactivity';
import { Customer } from '../../customer';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class WeatherService {
  private customersUrl = 'http://localhost:8080/api/customers'; 

  constructor(public http: HttpClient) {
  }
  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
   
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  addCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, httpOptions);
    
  }

  deleteCustomer (customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions);
  }

  updateCustomer (customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }
  getWeather (city: string,metric: 'metric'| 'imperial' = 'metric'): Observable <any>{
    const apicall =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=2f9ba3daddf0e9de5a568b3b887a4246`;
    return this.http.get<any>(apicall).pipe(map(resp=>{
      console.log(resp)
      const state =resp.weather[0];
      const name = resp.name;
      const humidity =resp.main.humidity;
      const wind = (Math.round(Math.round(resp.wind.speed)));
      const tempmax = (Math.round(Number(resp.main.temp_max)));
      const tempmin = (Math.round(Number(resp.main.temp_min)));
      const temp = (Math.round(Number(resp.main.temp)));
      const x ={ state, temp, wind, humidity,tempmax,tempmin, name};
      return x;
    }))

  }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=2f9ba3daddf0e9de5a568b3b887a4246`)
      .subscribe((data) => {
        dataSub.next(data['weather']);
      }, (err) => {
        console.log(err);
      });
    return dataSub;
  }
    
  getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const citiesSubject = new Subject();
    cities.forEach((city) => {
      citiesSubject.next(this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=2f9ba3daddf0e9de5a568b3b887a4246`));
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2f9ba3daddf0e9de5a568b3b887a4246`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
        console.log(dataSubject,'fete');
      });
    return dataSubject;
  }
 
  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=2f9ba3daddf0e9de5a568b3b887a4246`)
      .subscribe((weather: any) => {
        dataSubject.next(weather);
        console.log('seke',dataSubject);
      });
    return dataSubject;
  }

}
