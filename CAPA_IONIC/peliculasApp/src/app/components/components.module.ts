import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidesShowBackdropComponent } from './slides-show-backdrop/slides-show-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlidesShowPostersComponent } from './slides-show-posters/slides-show-posters.component';
import { SlidesShowParComponent } from './slides-show-par/slides-show-par.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    SlidesShowBackdropComponent,
    SlidesShowPostersComponent,
    SlidesShowParComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [
    SlidesShowBackdropComponent,
    SlidesShowPostersComponent,
    SlidesShowParComponent,
    DetailsComponent,
  ],
})
export class ComponentsModule {}
