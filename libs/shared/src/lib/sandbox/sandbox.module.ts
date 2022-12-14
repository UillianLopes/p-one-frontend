import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneButtonModule } from '../button';
import { SandboxComponent } from './sandbox.component';
import { SandboxRoutingModule } from './sandbox.routing';

@NgModule({
  declarations: [SandboxComponent],
  imports: [CommonModule, SandboxRoutingModule, POneButtonModule],
})
export class SandboxModule {}
