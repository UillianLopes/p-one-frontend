import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { combineLatest, takeUntil } from 'rxjs';

import { DestroyableMixin } from '../@mixins';
import { RolesService } from './roles.state';

@Directive({
  selector: '[pOneHasRoles]',
})
export class HasRolesDirective extends DestroyableMixin() implements OnInit {
  @Input('pOneHasRoles') public roles: string[] = [];
  @Input() public operator: 'OR' | 'AND' = 'OR';

  private isEmbeddedViewCreated = false;

  constructor(
    private readonly _templateRef: TemplateRef<any>,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _service: RolesService
  ) {
    super();
  }

  public ngOnInit(): void {
    combineLatest([this._service.roles$, this._service.ignoreAllRoles$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([roles, ignoreAllRoles]) => {
        if (ignoreAllRoles) {
          if (this.isEmbeddedViewCreated) {
            return;
          }

          this._viewContainerRef.createEmbeddedView(this._templateRef);
          this.isEmbeddedViewCreated = true;
          return;
        }

        if (!roles) {
          return;
        }

        if (
          ignoreAllRoles ||
          (this.operator == 'OR' &&
            this.roles.some((role) => roles.includes(role))) ||
          (this.operator == 'AND' &&
            this.roles.every((role) => roles.includes(role)))
        ) {
          this._viewContainerRef.createEmbeddedView(this._templateRef);
          this.isEmbeddedViewCreated = true;
        } else {
          this._viewContainerRef.clear();
          this.isEmbeddedViewCreated = false;
        }
      });
  }
}
