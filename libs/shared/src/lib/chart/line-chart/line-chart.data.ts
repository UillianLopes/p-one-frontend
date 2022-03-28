export interface LineChartSerie {
  value: number;
  name: string;
}

export interface LineChartGroup {
  color: string;
  name: string;
  series: LineChartSerie[];
}

export interface LineChartData {
  groups: LineChartGroup[];
}
