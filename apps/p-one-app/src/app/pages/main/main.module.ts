import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { POneNotificationsStoreModule } from '@p-one/stores/notifications';
import { POneSidenavModule } from '@p-one/shared';
@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule, 
    MainRoutingModule, 
    POneNotificationsStoreModule, 
    POneSidenavModule
  ],
  
})
export class MainModule { }
