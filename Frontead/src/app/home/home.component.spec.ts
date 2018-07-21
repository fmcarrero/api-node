import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { HotelService } from '../services/hotel.service';
import { Observable } from 'rxjs/Rx';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule, HttpClientModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('checkAll checke= false test',()=> {
 
    //arrange
    let ev : any;
    ev = {};
    ev.target = {
      checked : false
    }   
    //act
    component.checkAll(ev);
    //assert
    expect(component.filters.stars.length).toEqual(0);
  });
  it ('checkAll checke= true test',()=> {
 
    //arrange
    let hotelservice = TestBed.get(HotelService);
    spyOn(hotelservice,"searchHotels").and.returnValue(Observable.of(new Array()));
    let ev : any;
    ev = {};
    ev.target = {
      checked : true
    }   
    //act
    component.checkAll(ev);
    //assert
    expect(component.filters.stars.length).toEqual(5);
  });

  it('updateSelectedStart test',()=> { 
    //arrange
    let ev : any;
    ev = {};
    ev.target = {
      checked : true
    }   
    //act
     component.updateSelectedStart(ev,1);
    //assert
    expect(component.filters.stars[0]).toEqual(1);
  });
  it('updateSelectedStart remove test',()=> { 
    //arrange
    let ev : any;
    ev = {};
    ev.target = {
      checked : false
    }   
    component.filters.stars.push(1);
    //act
     component.updateSelectedStart(ev,1);
    //assert
    expect(component.filters.stars.length).toEqual(0);
  });
  it('updateSelectedStart remove 2 test',()=> { 
    //arrange
    let ev : any;
    ev = {};
    ev.target = {
      checked : false
    }   
    component.filters.stars.push(1);
    //act
     component.updateSelectedStart(ev,2);
    //assert
    expect(component.filters.stars.length).toEqual(1);
  });
});
