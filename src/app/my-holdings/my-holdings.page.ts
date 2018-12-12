import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, Holding } from '../services/data.service';
import { Platform, List } from '@ionic/angular';
import { AlertController } from '@ionic/angular/dist/providers/alert-controller';


@Component({
  selector: 'app-my-holdings',
  templateUrl: './my-holdings.page.html',
  styleUrls: ['./my-holdings.page.scss'],
})
export class MyHoldingsPage implements OnInit {

  holdings: Holding[] = [];

  newHolding: Holding = <Holding>{};

  public nameLists;
  
    public myId: String = '';
    public myprodID: String = '';
    public listInfo: Object = '';
    

  @ViewChild('mylist')mylist: List;

  constructor(private dataService: DataService, private plt: Platform, private alertCtrl: AlertController) { 
    this.dataService.getData().subscribe(response => {
      this.nameLists = response
      this.listInfo = this.nameLists.find(e => e.symbol === this.nameLists.symbol)
      })
      console.log(this.nameLists)
    this.plt.ready().then(() => {
      this.loadHoldings();
    })
  }

  ngOnInit() {
    
    this.dataService.getData();
  }

  // CREATE
  addHolding() {

    // video
    this.newHolding.id = Date.now();

    this.dataService.addHolding(this.newHolding).then(holding => {
      this.newHolding = <Holding>{};
      this.loadHoldings();
    })
    // video

  }

  // READ
  loadHoldings() {
    this.dataService.getHoldings().then(holdings => {
      this.holdings = holdings;
    })
  }

  // UPDATE
  updateHolding(holding: Holding) {

   let newQuantity = null;

    this.alertCtrl.create({
      header: 'Update Holding',
      message: 'Enter a new quantity of this coin',
      inputs: [
        {
          type: 'number',
          name: 'quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            newQuantity = data.quantity;
            console.log(data.quantity);
            holding.quantity = newQuantity;
            this.dataService.updateHolding(holding).then(holding => {
             this.mylist.closeSlidingItems();
             this.loadHoldings();
           })
            
          }
        }
      ]
    }).then((prompt) => {
      prompt.present();
    })

     // code from video
     console.log(newQuantity);
    //  holding.quantity = newQuantity;
    //  this.dataService.updateHolding(holding).then(holding => {
    //   this.mylist.closeSlidingItems();
    //   this.loadHoldings();
    // })
    // end code from video

    
  }

  // DELETE
  deleteHolding(holding: Holding) {
    this.dataService.deleteHolding(holding.id).then(holding => {
      this.mylist.closeSlidingItems();
      this.loadHoldings();
    })
  }

  getPrice(symbol) {
    for (var i = 0; i < this.nameLists.length; i++) {
      if (this.nameLists[i]["symbol"] === symbol) {
        return this.nameLists[i]["latestPrice"];
      }
    }
  }

}
