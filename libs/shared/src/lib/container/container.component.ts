import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { DestroyableMixin } from '../@mixins/destroyable.mixin';
import { ContainerFacade } from './container.facade';

@Component({
  selector: 'p-one-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  host: {
    class: 'p-one-container',
  },
  encapsulation: ViewEncapsulation.None,
  providers: [ContainerFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent extends DestroyableMixin() implements OnInit {
  readonly isLoading$ = this._facade.isLoading$;
  readonly isScrolling$ = this._facade.isScrolling$;

  @Input()
  set isLoading(value: boolean) {
    this._facade.setIsLoading(value);
  }

  @Input()
  set isScrolling(value: boolean) {
    this._facade.setIsScrolling(value);
  }

  constructor(private readonly _facade: ContainerFacade) {
    super();
  }

  ngOnInit(): void {}
}
