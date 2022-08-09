import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HasRolesDirective } from './has-roles.directive';
import { RolesService } from './roles.state';

@NgModule({
  declarations: [HasRolesDirective],
  imports: [CommonModule],
  exports: [HasRolesDirective],
})
export class POneRolesModule {
  static forRoot(): ModuleWithProviders<POneRolesModule> {
    return {
      ngModule: POneRolesModule,
      providers: [RolesService],
    };
  }
}
