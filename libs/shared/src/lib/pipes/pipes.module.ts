import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FirstNamePipe } from './first-name/first-name.pipe';

@NgModule({
  declarations: [FirstNamePipe],
  imports: [CommonModule],
  exports: [FirstNamePipe],
})
export class POnePipesModule {}
