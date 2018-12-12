import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular/dist/providers/alert-controller';

export interface Holding {
  id: any,
  coinID: any,
  quantity: number,
  coinName: string
}

const HOLDINGS_KEY = 'my-holdings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data: any;
  public holdings: Holding[] = [];
  

  constructor(private http: HttpClient, private storage: Storage, private alertCtrl: AlertController) { }

  // Create 
  addHolding(holding: Holding): Promise<any> {

    // code from video
    return this.storage.get(HOLDINGS_KEY).then((holdings: Holding[]) => {
      if (holdings) {
        holdings.push(holding);
        return this.storage.set(HOLDINGS_KEY, holdings);
      } else {
        return this.storage.set(HOLDINGS_KEY, [holding]);
      }
    })
    // end code from video

    

  }

  // Read 
  getHoldings(): Promise<Holding[]> {
    return this.storage.get(HOLDINGS_KEY);
  }

  // Update 
  updateHolding(holding: Holding): Promise<any>  {


    // VIDEO CODE
    return this.storage.get(HOLDINGS_KEY).then((holdings: Holding[]) => {
      if (!holdings || holdings.length === 0) {
        return null;
      }

      let newHoldings: Holding[] = [];

      for(let i of holdings) {
        if(i.id === holding.id) {
          newHoldings.push(holding);
        } else {
          newHoldings.push(i);
        }
      }

      return this.storage.set(HOLDINGS_KEY, newHoldings);

    })

    // let index = this.holdings.indexOf(holding);

    // if(index > -1) {
    //   this.holdings[index].quantity = data.quantity;
    //   this.save();
    // }

  }

  // Delete
  deleteHolding(id: number): Promise<Holding> {
    return this.storage.get(HOLDINGS_KEY).then((holdings: Holding[]) => {
      if (!holdings || holdings.length === 0) {
        return null;
      }

      let toKeep: Holding[] = [];

      for (let i of holdings) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(HOLDINGS_KEY, toKeep);
    })
  }

  public getData(): any {
    return this.http.get('https://api.iextrading.com/1.0/stock/market/crypto');
  }


  save(): void {
    this.storage.set('holdings', this.holdings);
  }
  
}
