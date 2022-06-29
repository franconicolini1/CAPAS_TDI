import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlidingPageRoutingModule } from './sliding-routing.module';

import { SlidingPage } from './sliding.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlidingPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SlidingPage],
})
export class SlidingPageModule {}
