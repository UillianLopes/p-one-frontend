import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { BarChartData } from '@p-one/shared';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data$ = of({
    series: [
      {
        name: 'Teste',
        value: 200,
      },
      {
        name: 'Teste II',
        value: 100,
      },
      {
        name: 'Teste II',
        value: 100,
      },
      {
        name: 'Teste III',
        value: 125,
      },
      {
        name: 'Teste IV',
        value: 150,
      },
      {
        name: 'Teste V',
        value: 300,
      },
      {
        name: 'Teste VI',
        value: 30,
      },
    ],
  } as BarChartData);

  constructor() {}

  ngOnInit(): void {}
}
