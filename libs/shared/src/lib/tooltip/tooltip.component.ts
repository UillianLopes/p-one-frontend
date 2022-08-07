import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional, TemplateRef } from '@angular/core';

import { tooltipAnimation } from './tooltip.animation';
import { TOOLTIP_CONFIG, TOOLTIP_DATA, TOOLTIP_TEMPLATE } from './tooltip.constants';
import { TooltipRef } from './tooltip.ref';
import { TooltipStore } from './tooltip.state';

@Component({
  selector: 'p-one-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [tooltipAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TooltipStore]
})
export class TooltipComponent implements OnInit {
  public readonly status$ = this._store.status$;

  constructor(
    private readonly _store: TooltipStore,

    public readonly tooltipRef: TooltipRef,

    @Optional()
    @Inject(TOOLTIP_TEMPLATE)
    public readonly template?: TemplateRef<any>,

    @Optional()
    @Inject(TOOLTIP_DATA)
    public readonly data?: string,

    @Optional()
    @Inject(TOOLTIP_CONFIG)
    public readonly config?: {
      useTooltipStyle: boolean;
    }
  ) {}

  ngOnInit(): void {
    this._store.setStatus('OPENED');
  }
}
