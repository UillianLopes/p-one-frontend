import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { uniqueId } from 'lodash';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive()
export abstract class Chart<T> implements OnInit, AfterViewInit, OnDestroy {
  protected readonly uniqueId = `${this._nameId}-${uniqueId()}`;

  private readonly _updated$ = new Subject<void>();
  private readonly _resized$ = new Subject<DOMRect>();
  private readonly _resizeObserver = new ResizeObserver(() =>
    this._ngZone.run(() => {
      this._resized$.next(this._getContainerRect());
    })
  );

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

  protected readonly destroyed$ = new Subject<void>();

  constructor(
    protected readonly _elementRef: ElementRef<HTMLElement>,
    protected readonly _ngZone: NgZone,
    private readonly _nameId: string
  ) {}
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this._resizeObserver.unobserve(this._elementRef.nativeElement);
    this._resizeObserver.disconnect();
  }

  ngOnInit(): void {
    this.init(this.data, this._getContainerRect());

    this._resized$
      .pipe(
        takeUntil(this.destroyed$),
        distinctUntilChanged(
          (a, b) => a.width === b.width && a.height === b.height
        )
      )
      .subscribe((rect) => {
        this.resize(this._data, this._oldData, rect);
      });

    this._updated$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.update(this._data, this._oldData, this._getContainerRect());
    });

    this._resizeObserver.observe(this._elementRef.nativeElement);
  }

  abstract init(data: T, containerRect: DOMRect): void;

  abstract update(data: T, oldData: T, containerRect: DOMRect): void;

  abstract resize(data: T, oldData: T, containerRect: DOMRect): void;

  private _getContainerRect(): DOMRect {
    return this._elementRef.nativeElement.getBoundingClientRect();
  }

  public slugify(value: string) {
    return value.replace(/[^0-9a-zA-Z_-]/g, '');
  }
}
