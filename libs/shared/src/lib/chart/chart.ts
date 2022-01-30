import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { uniqueId } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive()
export abstract class Chart<T> implements OnInit, OnDestroy {
  protected readonly uniqueId = `${this._nameId}-${uniqueId()}`;

  private readonly _updated$ = new Subject();
  private readonly _resized$ = new Subject();
  private readonly _resizeObserver = new ResizeObserver(() =>
    this._ngZone.run(() => {
      this._resized$.next();
    })
  );

  private _svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this._resizeObserver.unobserve(this._elementRef.nativeElement);
    this._resizeObserver.disconnect();
  }

  ngOnInit(): void {
    this._resizeObserver.observe(this._elementRef.nativeElement);
    this._svg = this.init(this._data, this._getContainerRect());

    this._updated$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.update(
        this._svg,
        this._data,
        this._oldData,
        this._getContainerRect()
      );
    });

    this._resized$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.resize(
        this._svg,
        this._data,
        this._oldData,
        this._getContainerRect()
      );
    });
  }

  abstract init(
    data: T,
    containerRect: DOMRect
  ): d3.Selection<SVGSVGElement, unknown, null, undefined>;

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
}
