import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverInfoPageRoutingModule } from './popover-info-routing.module';

import { PopoverInfoPage } from './popover-info.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverInfoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PopoverInfoPage],
})
export class PopoverInfoPageModule {}
