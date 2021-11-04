import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneLoadingModule } from '../loading';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogCloseDirective } from './dialog-close/dialog-close.directive';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogService } from './dialog.service';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    DialogContainerComponent,
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogCloseDirective,
  ],
  imports: [CommonModule, PortalModule, OverlayModule, POneLoadingModule],
  exports: [
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogCloseDirective,
  ],
  providers: [DialogService],
})
export class POneDialogModule {}
