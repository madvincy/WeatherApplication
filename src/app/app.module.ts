import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {WeatherService} from './services/weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {WeatherCardComponent} from './ui/weather-card/weather-card.component';
import {AddCardComponent} from './ui/add-card/add-card.component';
import { SuggestionCardComponent } from './ui/suggestion-card/suggestion-card.component';
import { FormsModule } from '@angular/forms';
import { MoodsactivitydetailComponent } from './moodsactivitydetail/moodsactivitydetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    WeatherCardComponent,
    AddCardComponent,

    AddCardComponent,
    SuggestionCardComponent,
    MoodsactivitydetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    WeatherService,
    


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
