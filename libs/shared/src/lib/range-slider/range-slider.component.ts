import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injectable,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

export interface RangeSliderState {
  containerWidth: number;
  initialValue: number;
  finalValue: number;
  value: number;
}

@Injectable()
export class RangeSliderStore extends ComponentStore<RangeSliderState> {
  public readonly finalValue$ = this.select(({ finalValue }) => finalValue);
  public readonly initialValue$ = this.select(
    ({ initialValue }) => initialValue
  );

  public readonly value$ = this.select(({ value }) => value);
  public readonly containerWidth$ = this.select(
    ({ containerWidth }) => containerWidth
  );

  constructor() {
    super({
      containerWidth: 0,
      initialValue: 0,
      finalValue: 100,
      value: 0,
    });
  }

  public readonly setContainerWidth = this.updater(
    (state, containerWidth: number) => {
      return {
        ...state,
        containerWidth,
      };
    }
  );

  public readonly setValue = this.updater((state, value: number) => {
    return {
      ...state,
      value,
    };
  });

  public readonly setInitialValue = this.updater((state, value: number) => {
    return {
      ...state,
      value,
    };
  });

  public readonly setFinalValue = this.updater((state, value: number) => {
    return {
      ...state,
      value,
    };
  });
}

@Component({
  selector: 'p-one-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RangeSliderStore],
})
export class RangeSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _nativeElement = this._elementRef.nativeElement;
  private readonly _resizeObserver = new ResizeObserver(() =>
    this._ngZone.run(() => {
      this._resized$.next(this._nativeElement.getBoundingClientRect());
    })
  );

  private readonly _destroyed$ = new Subject();
  private readonly _resized$ = new Subject<DOMRect>();

  public readonly thicks$ = this._store.containerWidth$.pipe(
    map((containerWidth) => {
      let thicksNumber = Math.round(containerWidth / 10) + 1;

      if (thicksNumber % 2 == 0) {
        thicksNumber++;
      }

      return new Array(thicksNumber);
    })
  );

  public readonly thicksWidth$ = this._store.containerWidth$.pipe(
    map((width) => width)
  );

  public readonly slideWidth$ = this.thicksWidth$.pipe(
    map((width) => width * 2)
  );

  private readonly _sliderPosition$ = new BehaviorSubject(0);

  public readonly value$ = this._sliderPosition$.pipe(
    map((position) => {
      return Math.round(
        (position / 500) * (this.finalValue - this.initialValue) +
          this.initialValue
      );
    })
  );

  @Input()
  public initialValue = 0;

  @Input()
  public finalValue = 10;

  @ViewChild(CdkScrollable, { static: true })
  public _scrollable?: CdkScrollable;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _ngZone: NgZone,
    private readonly _store: RangeSliderStore
  ) {}

  panright(): void {
    if (this._sliderPosition$.value + 1 <= 500) {
      this._sliderPosition$.next(this._sliderPosition$.value + 1);
    } else {
      this._sliderPosition$.next(500);
    }
  }

  panleft(): void {
    if (this._sliderPosition$.value - 1 >= 0) {
      this._sliderPosition$.next(this._sliderPosition$.value - 1);
    } else {
      this._sliderPosition$.next(0);
    }
  }

  ngOnDestroy(): void {
    this._resizeObserver.unobserve(this._nativeElement);
    this._resizeObserver.disconnect();
    this._destroyed$.next();
  }

  ngAfterViewInit(): void {
    this._resizeObserver.observe(this._nativeElement);
    this._resized$.next();
  }

  ngOnInit(): void {
    this._resized$
      .pipe(
        takeUntil(this._destroyed$),
        filter((f) => !!f),
        distinctUntilChanged()
      )
      .subscribe(({ width }) => {
        this._store.setContainerWidth(width);
      });
  }
}
