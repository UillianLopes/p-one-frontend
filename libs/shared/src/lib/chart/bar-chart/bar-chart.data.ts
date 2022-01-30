export interface BarChartData {
  series: BarChartSerie[];
}

export interface BarChartSerie {
  color: string;
  name: string;
  value: number;
}
