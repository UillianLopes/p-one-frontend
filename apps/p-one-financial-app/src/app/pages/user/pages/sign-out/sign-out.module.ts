import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignOutComponent } from './sign-out.component';
import { SignOutRoutingModule } from './sign-out.routing';

@NgModule({
  declarations: [SignOutComponent],
  imports: [CommonModule, SignOutRoutingModule],
})
export class SignOutModule {}
