import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, Observable, of, observable } from 'rxjs';
import { City } from '../../weather';
import { Moodsactivity } from '../../moodsactivity';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class WeatherService {
  private moodactivitiesUrl = 'http://localhost:8080/api/moodsactivities'; 

  constructor(public http: HttpClient) {
  }
  
  getMoodactivities (): Observable<Moodsactivity[]> {
    return this.http.get<Moodsactivity[]>(this.moodactivitiesUrl);
   
  }
 
  getMoodsactivity(id: number): Observable<Moodsactivity> {
    const url = `${this.moodactivitiesUrl}/${id}`;
    return this.http.get<Moodsactivity>(url);
  }

  addMoodsactivity (moodactivity: Moodsactivity): Observable<Moodsactivity> {
    return this.http.post<Moodsactivity>(this.moodactivitiesUrl, moodactivity, httpOptions);
    
  }

  deleteMoodsactivity (moodactivity: Moodsactivity | number): Observable<Moodsactivity> {
    const id = typeof moodactivity === 'number' ? moodactivity : moodactivity.id;
    const url = `${this.moodactivitiesUrl}/${id}`;

    return this.http.delete<Moodsactivity>(url, httpOptions);
  }

  updateMoodsactivity (moodactivity: Moodsactivity): Observable<any> {
    return this.http.put(this.moodactivitiesUrl, moodactivity, httpOptions);
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
      
      });
    return dataSubject;
  }

}
