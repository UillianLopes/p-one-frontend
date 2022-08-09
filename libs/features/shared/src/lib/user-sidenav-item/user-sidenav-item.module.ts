import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
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
    NgbPopoverModule
  ],
  exports: [UserSidenavItemComponent],
})
export class POneUserSidenavItemModule {}
