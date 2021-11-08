import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { uniqueId } from 'lodash';
import { fromEvent, of, Subject } from 'rxjs';
import { mergeAll, startWith, takeUntil } from 'rxjs/operators';

@Directive()
export abstract class Chart<T> implements OnInit, OnDestroy {
  protected readonly uniqueId = uniqueId('chart-');
  protected readonly data$ = new Subject<T>();
  protected readonly destroyed$ = new Subject();
  protected readonly resized$ = new Subject();
  protected readonly resizeObserver = new ResizeObserver(() => {
    this.resized$.next();
  });

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

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  ngOnInit(): void {
    this.resizeObserver.observe(this._elementRef.nativeElement);
    of(
      fromEvent(this._elementRef.nativeElement, 'resize'),
      this.data$,
      this.resized$
    )
      .pipe(mergeAll(), takeUntil(this.destroyed$), startWith(''))
      .subscribe(() => {
        this.render(this.data, this._getContainerRect());
      });
  }

  abstract render(data: T, containerRect: DOMRect): void;

  private _getContainerRect(): DOMRect {
    return this._elementRef.nativeElement.getBoundingClientRect();
  }
}
