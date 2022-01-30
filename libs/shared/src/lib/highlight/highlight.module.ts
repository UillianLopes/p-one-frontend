import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HighlightableDirective } from './highlightable.directive';

@NgModule({
  declarations: [HighlightableDirective],
  imports: [CommonModule],
  exports: [HighlightableDirective],
})
export class HighlightModule {
  public static forRoot(): ModuleWithProviders<HighlightModule> {
    return {
      ngModule: HighlightModule,
      providers: [HighlightableDirective],
    };
  }

  public static forChild(): ModuleWithProviders<HighlightModule> {
    return {
      ngModule: HighlightModule,
      providers: [HighlightableDirective],
    };
  }
}
