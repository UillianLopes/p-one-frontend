import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '../directives';
import { POneTooltipModule } from '../tooltip';
import { SidenavCollapseComponent } from './sidenav-collapse/sidenav-collapse.component';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { SidenavDividerComponent } from './sidenav-divider/sidenav-divider.component';
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
    SidenavDividerComponent
  ],
  imports: [CommonModule, RouterModule, DirectivesModule, POneTooltipModule],
  exports: [
    SidenavComponent,
    SidenavContainerComponent,
    SidenavItemComponent,
    SidenavContentComponent,
    SidenavCollapseComponent,
    SidenavTriggerDirective,
    SidenavDividerComponent
  ],
})
export class POneSidenavModule {}
