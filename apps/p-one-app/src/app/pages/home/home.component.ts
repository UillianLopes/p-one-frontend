import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BarChartData } from '@p-one/shared';
import { of } from 'rxjs';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly data$ = of({
    series: [
      {
        name: 'Teste',
        value: 200,
        color: '#f56cb2'
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

  constructor(el: ElementRef<HTMLElement>) {
    var formArray = new FormArray([]);
    formArray.clear()
  }

  ngOnInit(): void {}
}
