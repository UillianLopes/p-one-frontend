import { Subject } from 'rxjs';

import { ChartLegendData } from './chart-legend.data';

export interface ICanHaveALegend {
  updateLegends$: Subject<ChartLegendData[]>;
}
