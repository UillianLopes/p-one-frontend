import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneUserSidenavItemModule } from '@p-one/features/shared';
import {
  POneContainerModule,
  POneHeaderModule,
  POneSidenavModule,
} from '@p-one/shared';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    TranslateModule,
    POneUserSidenavItemModule,
  ],
})
export class AdminModule {}
