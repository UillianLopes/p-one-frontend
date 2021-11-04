import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContextMenuHostDirective } from './context-menu-host.directive';
import { ContextMenuComponent } from './context-menu.component';

@NgModule({
  declarations: [ContextMenuComponent, ContextMenuHostDirective],
  imports: [CommonModule],
  exports: [ContextMenuHostDirective],
})
export class POneContextMenuModule {}
