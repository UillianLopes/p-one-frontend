import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { Collapsable, COLLAPSE } from '../collapse.component';
import { CollapseStatus } from '../collapse.state';
import { collapseIndicatorAnimation } from './collapse-indicator.animations';

@Component({
  selector: 'p-one-collapse-indicator',
  templateUrl: './collapse-indicator.component.html',
  styleUrls: ['./collapse-indicator.component.scss'],
  animations: [collapseIndicatorAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CollapseIndicatorComponent implements OnInit {
  public status$?: Observable<CollapseStatus>;

  @Input() public collapsable?: Collapsable;

  constructor(
    @Optional() @Inject(COLLAPSE) private readonly _collapsable?: Collapsable
  ) {}
  public ngOnInit(): void {
    this.status$ = (this.collapsable ?? this._collapsable)?.status$;
  }
}
