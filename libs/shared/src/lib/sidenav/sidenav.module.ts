import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '../directives';
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
  imports: [CommonModule, RouterModule, DirectivesModule],
  exports: [
    SidenavComponent,
    SidenavContainerComponent,
    SidenavItemComponent,
    SidenavContentComponent,
    SidenavCollapseComponent,
    SidenavTriggerDirective,
  ],
})
export class POneSidenavModule {}
