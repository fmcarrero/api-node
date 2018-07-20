import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { Filter } from '../domain/Filter';

import { ConstantsHome } from '../domain/ConstantsHome';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hotelsList: Array<any>;
  filters: Filter;
  arrStars = Array;
  stars = [];
  constructor(private hotelService: HotelService) { }
  ngOnInit() {
    this.filters = new Filter('', new Array<number>());
    this.searchHotels();
    this.fillStars();    
  }

  
  fillStars(){
    for (let i = ConstantsHome.MAX_STARS; i > 0; i--) {
      this.stars.push({
        stars: Array(i).fill(1),
        value: i,      
        title: null,
        state : false
      });
    }
  }
  checkAll(ev) {
    this.stars.forEach(x => x.state = ev.target.checked);
    if(!ev.target.checked){
      this.filters.stars =[];
    }else{
      this.stars.forEach(x => this.filters.stars.push(x.value));
    }
    
    this.searchHotels();
  }
  searchHotels() {    
    this.hotelService.searchHotels(this.filters).subscribe(data => {
      this.hotelsList = data;
    });
  }
  updateSelectedStart($event, startValue) {  
    if ($event.target.checked) {
      this.filters.stars.push(startValue);
    } else {
      var index =  this.filters.stars.indexOf(startValue, 0);
      if (index > -1) {
        this.filters.stars.splice(index, 1);
      }
    }
    this.searchHotels();
  }

}
