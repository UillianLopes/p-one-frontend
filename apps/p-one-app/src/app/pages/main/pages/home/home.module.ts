import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListModule } from '@p-one/shared';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ListModule],
})
export class HomeModule {}
