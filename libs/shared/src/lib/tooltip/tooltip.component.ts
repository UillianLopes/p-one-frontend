import { Component, Inject, Optional, TemplateRef } from '@angular/core';

import { TOOLTIP_DATA, TOOLTIP_TEMPLATE } from './tooltip.constants';
import { TooltipRef } from './tooltip.ref';

@Component({
  selector: 'p-one-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  constructor(
    public tooltipRef: TooltipRef,
    @Optional()
    @Inject(TOOLTIP_TEMPLATE)
    public readonly template?: TemplateRef<any>,
    @Optional() @Inject(TOOLTIP_DATA) public readonly data?: string
  ) {}

  ngOnInit(): void {}
}
