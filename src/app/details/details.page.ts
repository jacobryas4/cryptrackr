import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public nameLists;

  public myId: String = '';
  public myprodID: String = '';
  public listInfo: Object = '';

  constructor(private route: ActivatedRoute, public service: DataService) {
    this.service.getData().subscribe(response => {
    this.nameLists = response
    this.listInfo = this.nameLists.find(e => e.symbol === this.nameLists.symbol)
    })
    console.log(this.nameLists)
  }

  ngOnInit() {

    this.myId = this.route.snapshot.paramMap.get('symbol');

    this.service.getData();

  }

}
