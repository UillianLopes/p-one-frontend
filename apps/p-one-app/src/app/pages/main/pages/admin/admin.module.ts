import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
