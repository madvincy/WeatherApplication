import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodsactivitydetailComponent } from './moodsactivitydetail.component';

describe('MoodsactivitydetailComponent', () => {
  let component: MoodsactivitydetailComponent;
  let fixture: ComponentFixture<MoodsactivitydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodsactivitydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodsactivitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
