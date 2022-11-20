import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { tooltipAnimation } from './tooltip.animation';
import { TOOLTIP_CONFIG, TOOLTIP_DATA, TOOLTIP_TEMPLATE } from './tooltip.constants';
import { TooltipPosition } from './tooltip.directive';
import { TooltipRef } from './tooltip.ref';
import { TooltipStore } from './tooltip.state';

@Component({
  selector: 'p-one-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [tooltipAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TooltipStore],
})
export class TooltipComponent implements OnInit {
  readonly status$ = this._store.status$;
  readonly position$ = this._store.position$;
  readonly closed$ = new Subject<void>();
  readonly opened$ = new Subject<void>();

  constructor(
    private readonly _store: TooltipStore,
    readonly tooltipRef: TooltipRef,

    @Optional()
    @Inject(TOOLTIP_TEMPLATE)
    readonly template?: TemplateRef<any>,

    @Optional()
    @Inject(TOOLTIP_DATA)
    readonly data?: string,

    @Optional()
    @Inject(TOOLTIP_CONFIG)
    readonly config?: {
      useTooltipStyle: boolean;
      position: TooltipPosition;
    }
  ) {
  }

  ngOnInit(): void {}

  open(): void {
    this._store.setStatus('OPENED');
  }

  close(): void {
    this._store.setStatus('CLOSED');
  }

  tooltipAnimationDone({ fromState, toState }: AnimationEvent) {
    if (fromState === 'OPENED' && toState === 'CLOSED') {
      this.closed$.next();
    }

    if (toState === 'OPENED') {
      this.opened$.next();
    }
  }
}
