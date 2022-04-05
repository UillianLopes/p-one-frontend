import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';

@NgModule({
  declarations: [HeaderComponent, SubHeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, SubHeaderComponent],
})
export class POneHeaderModule {}
