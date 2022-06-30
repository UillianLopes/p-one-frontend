import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ADMIN_ENDPOINT } from './constants/admin-endpoints.token';
import { UserService } from './services/user.service';

@NgModule({
  imports: [CommonModule],
  providers: [],
})
export class POneAdminDomainModule {
  static forRoot({
    adminEndpoint,
  }: {
    adminEndpoint: string;
  }): ModuleWithProviders<POneAdminDomainModule> {
    return {
      ngModule: POneAdminDomainModule,
      providers: [
        {
          provide: ADMIN_ENDPOINT,
          useValue: adminEndpoint,
        },
        UserService,
      ],
    };
  }
}
