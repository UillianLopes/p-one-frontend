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
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

export interface RangeSliderState {
  containerWidth: number;
  minValue: number;
  maxValue: number;
  value: number;
  lastTimeStamp: number;
}

const SLIDER_DELAY = 100;
const THICK_WIDTH = 5;
const THICKS_GAP = 15;

@Injectable()
export class RangeSliderStore extends ComponentStore<RangeSliderState> {
  public readonly lastTimeStamp$ = this.select(
    ({ lastTimeStamp }) => lastTimeStamp
  );
  public readonly maxValue$ = this.select(({ maxValue }) => maxValue);
  public readonly minValue$ = this.select(({ minValue }) => minValue);
  public readonly thicks$ = this.select(
    this.minValue$,
    this.maxValue$,
    (minValue, maxValue) => {
      let values: number[] = [];

      for (let value = minValue; value <= maxValue; value++) {
        values = [...values, value];
      }

      return values;
    }
  );

  public readonly value$ = this.select(({ value }) => value);
  public readonly nextValue$ = this.select(this.value$, (value) => value + 1);
  public readonly previousValue$ = this.select(
    this.value$,
    (value) => value - 1
  );

  public readonly isInMinValue$ = this.select(
    this.minValue$,
    this.value$,
    (minValue, value) => value === minValue
  );

  public readonly isInMaxValue$ = this.select(
    this.maxValue$,
    this.value$,
    (maxValue, value) => value === maxValue
  );

  public readonly containerWidth$ = this.select(
    ({ containerWidth }) => containerWidth
  );

  constructor() {
    super({
      containerWidth: 0,
      minValue: 0,
      maxValue: 100,
      value: 0,
      lastTimeStamp: 0,
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

  public readonly setMinValue = this.updater((state, minValue: number) => {
    return {
      ...state,
      minValue,
      value: minValue,
    };
  });

  public readonly setMaxValue = this.updater((state, maxValue: number) => {
    return {
      ...state,
      maxValue,
    };
  });

  public readonly setLastTimeStamp = this.updater(
    (state, lastTimeStamp: number) => {
      return {
        ...state,
        lastTimeStamp,
      };
    }
  );

  public readonly addValue = this.effect(
    ($event: Observable<{ timeStamp: number }>) => {
      return $event.pipe(
        withLatestFrom(this.lastTimeStamp$, this.value$, this.maxValue$),
        filter(
          ([{ timeStamp }, lastTimeStamp, value, maxValue]) =>
            timeStamp - lastTimeStamp > SLIDER_DELAY && value < maxValue
        ),
        map(([{ timeStamp }, _, value, maxValue]) => [
          timeStamp,
          value,
          maxValue,
        ]),
        tap({
          next: ([timeStamp, value, maxValue]) => {
            if (value + 1 <= maxValue) this.setValue(value + 1);
            else this.setValue(maxValue);

            this.setLastTimeStamp(timeStamp);
          },
        })
      );
    }
  );

  public readonly removeValue = this.effect(
    ($event: Observable<{ timeStamp: number }>) => {
      return $event.pipe(
        withLatestFrom(this.lastTimeStamp$, this.value$, this.minValue$),
        filter(
          ([{ timeStamp }, lastTimeStamp, value, minValue]) =>
            timeStamp - lastTimeStamp > SLIDER_DELAY && value > minValue
        ),
        map(([{ timeStamp }, __, value, minValue]) => [
          timeStamp,
          value,
          minValue,
        ]),
        tap({
          next: ([timeStamp, value, minValue]) => {
            if (value - 1 >= minValue) this.setValue(value - 1);
            else this.setValue(minValue);
            this.setLastTimeStamp(timeStamp);
          },
        })
      );
    }
  );
}

@Component({
  selector: 'p-one-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RangeSliderStore],
})
export class RangeSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly THICKS_GAP = THICKS_GAP;
  public readonly THICK_WIDTH = THICK_WIDTH;
  public readonly SLIDER_DELAY = THICKS_GAP;
  public readonly SELECTOR_WIDTH = THICK_WIDTH + 2;

  @Input()
  public minValue = 0;

  @Input()
  public maxValue = 100;

  private readonly _destroyed$ = new Subject<void>();
  private readonly _resized$ = new Subject<DOMRect>();
  private readonly _nativeElement = this._elementRef.nativeElement;
  private readonly _resizeObserver = new ResizeObserver(() =>
    this._ngZone.run(() => {
      this._resized$.next(this._nativeElement.getBoundingClientRect());
    })
  );

  public readonly value$ = this._store.value$;
  public readonly previousValue$ = this._store.previousValue$;
  public readonly nextValue$ = this._store.nextValue$;
  public readonly containerWidth$ = this._store.containerWidth$;
  public readonly thicks$ = this._store.thicks$;
  public readonly thicksWidth$ = this.thicks$.pipe(
    map(({ length }) => length * THICK_WIDTH + length * THICKS_GAP)
  );

  public readonly maxValue$ = this._store.maxValue$;
  public readonly minValue$ = this._store.minValue$;

  public readonly slideWidth$ = combineLatest([
    this.thicksWidth$,
    this.containerWidth$,
  ]).pipe(map(([thicksWidth, containerWidth]) => containerWidth + thicksWidth));

  @ViewChild(CdkScrollable, { static: true })
  public _scrollable?: CdkScrollable;

  public readonly left$ = combineLatest([
    this.value$,
    this.minValue$,
    this.containerWidth$,
  ]).pipe(
    map(([value, minValue, containerWidth]) => {
      const difference = Math.abs(minValue - value);
      return (
        containerWidth / 2 -
        THICK_WIDTH / 2 -
        difference * (THICKS_GAP + THICK_WIDTH)
      );
    })
  );

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _ngZone: NgZone,
    private readonly _store: RangeSliderStore
  ) {}

  panleft($event: any): void {
    this._store.addValue({
      timeStamp: $event.timeStamp,
    });
  }

  panright($event: any): void {
    this._store.removeValue({
      timeStamp: $event.timeStamp,
    });
  }

  ngOnDestroy(): void {
    this._resizeObserver.unobserve(this._nativeElement);
    this._resizeObserver.disconnect();
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  ngAfterViewInit(): void {
    this._resizeObserver.observe(this._nativeElement);
    this._resized$.next(this._nativeElement.getBoundingClientRect());
  }

  ngOnInit(): void {
    this._store.setMinValue(this.minValue);
    this._store.setMaxValue(this.maxValue);
    this._resized$
      .pipe(
        takeUntil(this._destroyed$),
        filter((rect) => !!rect),
        distinctUntilChanged()
      )
      .subscribe(({ width }) => this._store.setContainerWidth(width));
  }
}
