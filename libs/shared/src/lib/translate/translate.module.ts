import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TranslatePipe } from './translate.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class POneTranslateModule {}
