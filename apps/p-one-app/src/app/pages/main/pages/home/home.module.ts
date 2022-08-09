import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListModule, POneDetailsModule, POneInputModule } from '@p-one/shared';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ListModule,
    POneDetailsModule,
    POneInputModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
