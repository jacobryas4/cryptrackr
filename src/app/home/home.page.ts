import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public nameLists;
  
    constructor(public service: DataService) {
      this.service.getData().subscribe(response => 
      this.nameLists = response)
      console.log(this.nameLists)
    }
    
}
