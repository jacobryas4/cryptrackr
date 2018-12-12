import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyHoldingsPage } from './my-holdings.page';

const routes: Routes = [
  {
    path: '',
    component: MyHoldingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyHoldingsPage]
})
export class MyHoldingsPageModule {}
