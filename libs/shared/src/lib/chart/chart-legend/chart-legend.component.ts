import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ChartLegendData } from './chart-legend.data';
import { ICanHaveALegend } from './i-can-have-an-legend';

@Component({
  selector: 'p-one-chart-legend',
  templateUrl: './chart-legend.component.html',
  styleUrls: ['./chart-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendComponent implements OnInit {
  @Input() public for?: ICanHaveALegend;

  public legends$?: Observable<ChartLegendData[]>;

  constructor() {}

  ngOnInit(): void {
    if (!this.for) {
      return;
    }

    this.legends$ = this.for
      .updateLegends$
      .asObservable();
  }
}
