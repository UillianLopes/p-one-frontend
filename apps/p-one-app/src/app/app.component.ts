import { Component, OnInit } from '@angular/core';
import { GlobalRoles } from '@p-one/core';
import { DestroyableMixin, RolesService } from '@p-one/shared';
import { AuthenticationStoreFacade } from '@p-one/stores/identity';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends DestroyableMixin() implements OnInit {
  constructor(
    private readonly _authenticationStoreFacade: AuthenticationStoreFacade,
    private readonly _rolesService: RolesService
  ) {
    super();
  }

  ngOnInit(): void {
    this._authenticationStoreFacade.load();
    this._authenticationStoreFacade.roles$
      .pipe(
        takeUntil(this.destroyed$),
        filter((roles) => !!roles)
      )
      .subscribe((roles) => {
        this._rolesService.setIgnoreAllRoles(
          roles.includes(GlobalRoles.Standalone)
        );
        this._rolesService.setRoles(roles);
      });
  }
}
