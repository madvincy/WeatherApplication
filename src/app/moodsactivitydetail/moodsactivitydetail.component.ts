import { Component, OnInit } from '@angular/core';
import { Moodsactivity } from '../moodsactivity';
import {WeatherService} from '../services/weather/weather.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-moodsactivitydetail',
  templateUrl: './moodsactivitydetail.component.html',
  styleUrls: ['./moodsactivitydetail.component.css']
})
export class MoodsactivitydetailComponent implements OnInit {

  moodactivity = new Moodsactivity() ;
  submitted = false;
  message: string;

  constructor(
    private weather: WeatherService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.weather.getMoodsactivity(id)
      .subscribe(moodactivity => this.moodactivity = moodactivity);
      console.log('wanted', this.moodactivity);
  }

  update(): void {
    this.submitted = true;
    this.weather.updateMoodsactivity(this.moodactivity)
        .subscribe(result => this.message = "Mood and Activity Updated Successfully!");
  }

  delete(): void {
    this.submitted = true;
    this.weather.deleteMoodsactivity(this.moodactivity.id)
        .subscribe(result => this.message = "Mood and Activity Deleted Successfully!");
  }

  goBack(): void {
    this.location.back();
  }
}
