import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { uniqueId } from 'lodash';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive()
export abstract class Chart<T> implements OnInit, AfterViewInit, OnDestroy {
  protected readonly uniqueId = `${this._nameId}-${uniqueId()}`;

  private readonly _updated$ = new Subject();
  private readonly _resized$ = new Subject<DOMRect>();
  private readonly _resizeObserver = new ResizeObserver(() =>
    this._ngZone.run(() => {
      this._resized$.next(this._getContainerRect());
    })
  );

  private _svg = d3.select(this._elementRef.nativeElement).append('svg');
  private _oldData!: T;
  private _data!: T;

  @Input()
  set data(value: T) {
    this._oldData = this.data;
    this._data = value;
    this._updated$.next();
  }

  @Input()
  public animationDuration = 300;

  protected readonly destroyed$ = new Subject();

  constructor(
    protected readonly _elementRef: ElementRef<HTMLElement>,
    protected readonly _ngZone: NgZone,
    private readonly _nameId: string
  ) {}
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this._resizeObserver.unobserve(this._elementRef.nativeElement);
    this._resizeObserver.disconnect();
  }

  ngOnInit(): void {
    this.init(this._svg, this.data, this._getContainerRect());

    this._resized$
      .pipe(
        takeUntil(this.destroyed$),
        distinctUntilChanged(
          (a, b) => a.width === b.width && a.height === b.height
        )
      )
      .subscribe((rect) => {
        this.resize(this._svg, this._data, this._oldData, rect);
      });

    this._updated$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.update(
        this._svg,
        this._data,
        this._oldData,
        this._getContainerRect()
      );
    });

    this._resizeObserver.observe(this._elementRef.nativeElement);
  }

  abstract init(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: T,
    containerRect: DOMRect
  ): void;

  abstract update(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: T,
    oldData: T,
    containerRect: DOMRect
  ): void;

  abstract resize(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: T,
    oldData: T,
    containerRect: DOMRect
  ): void;

  private _getContainerRect(): DOMRect {
    return this._elementRef.nativeElement.getBoundingClientRect();
  }

  public slugify(value: string) {
    return value.replace(/ /g, '-').replace(/\//g, '-');
  }
}
