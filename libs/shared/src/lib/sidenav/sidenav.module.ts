import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SidenavEffects } from './+state/sidenav.effects';
import { SidenavFacade } from './+state/sidenav.facade';
import { SIDENAV_KEY, sidenavReducer } from './+state/sidenav.reducer';
import { SidenavCollapseComponent } from './sidenav-collapse/sidenav-collapse.component';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { SidenavTriggerDirective } from './sidenav-trigger.directive';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [
    SidenavComponent,
    SidenavContainerComponent,
    SidenavItemComponent,
    SidenavContentComponent,
    SidenavCollapseComponent,
    SidenavTriggerDirective,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(SIDENAV_KEY, sidenavReducer),
    EffectsModule.forFeature([SidenavEffects]),
  ],
  exports: [
    SidenavComponent,
    SidenavContainerComponent,
    SidenavItemComponent,
    SidenavContentComponent,
    SidenavCollapseComponent,
    SidenavTriggerDirective,
  ],
  providers: [SidenavFacade],
})
export class POneSidenavModule {}
