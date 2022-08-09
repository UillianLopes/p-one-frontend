import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { delay, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../..';
import { observeResize$ } from '../oprators';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { sidenavHeaderAnimation, sidenavPaddingAnimation, sidenavWidthAnimation } from './sidenav.animations';
import { SidenavStore } from './sidenav.state';

@Component({
  selector: 'p-one-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    sidenavWidthAnimation,
    sidenavHeaderAnimation,
    sidenavPaddingAnimation,
  ],
})
export class SidenavComponent
  extends DestroyableMixin()
  implements OnDestroy, AfterContentInit
{
  @ContentChildren(SidenavItemComponent)
  public items!: QueryList<SidenavItemComponent>;
  public items$!: Observable<SidenavItemComponent[]>;

  public readonly state$ = this._store.sidenavState$;
  public readonly isFixed$ = this._store.isFixed$;
  public readonly isFloating$ = this._store.isFloating$;
  public readonly sidenaHeaderState$ = this._store.sidenavState$.pipe(
    delay(10)
  );

  constructor(
    private readonly _store: SidenavStore,
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _ngZone: NgZone
  ) {
    super();
  }
  ngAfterContentInit(): void {
    this._setSidenavWidthToContent();
  }

  toggle(): void {
    this._store.toggle();
  }

  private _setSidenavWidthToContent() {
    const sidenavItems =
      this._elementRef.nativeElement.querySelector<HTMLElement>('#sidenav');

    if (!sidenavItems) {
      return;
    }

    observeResize$(sidenavItems, this.destroyed$)
      .pipe(
        takeUntil(this.destroyed$),
        map(({ width }) => width),
        distinctUntilChanged()
      )
      .subscribe((width) => {
        this._ngZone.run(() => {
          this._store.setSidenavWidth(width);
        });
      });
  }
}
