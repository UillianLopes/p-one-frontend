import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneContainerModule } from '@p-one/shared';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user.routing';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, POneContainerModule],
})
export class UserModule {}
