import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins';
import { RolesService } from './roles.state';

@Directive({
  selector: '[pOneHasRoles]',
})
export class HasRolesDirective extends DestroyableMixin() implements OnInit {
  @Input('pOneHasRoles') public roles: string[] = [];

  @Input() public operator: 'OR' | 'AND' = 'OR';

  constructor(
    private readonly _templateRef: TemplateRef<any>,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _service: RolesService
  ) {
    super();
  }

  public ngOnInit(): void {
    this._service.roles$.pipe(takeUntil(this.destroyed$)).subscribe((roles) => {
      if (
        (this.operator == 'OR' && this.roles.some((role) => roles.includes(role))) ||
        (this.operator == 'AND' && this.roles.every((role) => roles.includes(role)))
      ) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      } else {
        this._viewContainerRef.clear();
      }
    });
  }
}
