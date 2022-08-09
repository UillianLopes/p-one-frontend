/* eslint-disable  */
import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { Constructor } from './constructor';

export function DestroyableMixin<T extends Constructor<{}>>(
  Base: T = class {} as any
) {
  @Directive()
  class Temporary extends Base implements OnDestroy {
    destroyed$ = new Subject<void>();

    constructor(...args: any[]) {
      super(args);
    }

    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
  }

  return Temporary;
}
