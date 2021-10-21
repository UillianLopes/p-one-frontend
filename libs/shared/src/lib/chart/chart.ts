import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { fromEvent, of, Subject } from 'rxjs';
import { mergeAll, startWith } from 'rxjs/operators';

import { ChartContainerMetrics } from './@types/chart-contianer-metics';

@Directive()
export abstract class Chart<T> implements OnInit {
  data$ = new Subject<T>();

  private _data!: T;

  @Input()
  set data(value: T) {
    this._data = value;
    this.data$.next(this._data);
  }

  get data(): T {
    return this._data;
  }

  constructor(protected readonly _elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    of(fromEvent(this._elementRef.nativeElement, 'resize'), this.data$)
      .pipe(mergeAll(), startWith(''))
      .subscribe(() => {
        const { clientHeight, clientWidth } = this._elementRef.nativeElement;
        this.render(this.data, { width: clientWidth, height: clientHeight });
      });
  }

  abstract render(data: T, containerMetrics: ChartContainerMetrics): void;
}
