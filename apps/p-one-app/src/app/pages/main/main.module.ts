import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneUserSidenavItemModule } from '@p-one/features/shared';
import { POneContainerModule, POneSidenavModule } from '@p-one/shared';
import { POneNotificationsStoreModule } from '@p-one/stores/notifications';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule, 
    MainRoutingModule, 
    POneNotificationsStoreModule, 
    POneSidenavModule,
    POneContainerModule,
    POneUserSidenavItemModule,
    TranslateModule
  ],
  
})
export class MainModule { }
