import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneFirstNamePipe, POneFlexModule, POneInitialsPipe, POneSidenavModule, POneTooltipModule } from '@p-one/shared';

import { UserSidenavItemComponent } from './user-sidenav-item.component';

@NgModule({
  declarations: [UserSidenavItemComponent],
  imports: [
    CommonModule,
    POneSidenavModule,
    POneInitialsPipe,
    POneFirstNamePipe,
    POneTooltipModule,
    POneFlexModule,
  ],
  exports: [UserSidenavItemComponent],
})
export class POneUserSidenavItemModule {}
