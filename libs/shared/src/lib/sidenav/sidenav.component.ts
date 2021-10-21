import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { delay, map, mapTo, shareReplay, startWith, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { DestroyableMixin } from '../..';
import { SidenavFacade } from './+state/sidenav.facade';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { sidenavHeaderAnimation, sidenavWidthAnimation } from './sidenav.animations';

@Component({
  selector: 'p-one-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sidenavWidthAnimation, sidenavHeaderAnimation],
})
export class SidenavComponent
  extends DestroyableMixin()
  implements OnDestroy, OnInit
{
  @ContentChildren(SidenavItemComponent)
  public items!: QueryList<SidenavItemComponent>;

  public items$!: Observable<SidenavItemComponent[]>;

  public readonly state$ = this._facade.state$.pipe(shareReplay());
  public readonly sidenaHeaderState$ = this.state$.pipe(
    delay(10),
    withLatestFrom(this._facade.sidenavHeaderHeight$),
    map(([value, sidenavHeaderHeight]) => {
      return {
        value,
        params: {
          sidenavHeaderHeight,
        },
      };
    }),
    tap((value) => console.log('SIDENAV HEADER -> ', value))
  );

  constructor(
    private readonly _facade: SidenavFacade,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {
    super();
  }
  ngOnInit(): void {
    this._listenToSidenavItemsSize();
    this._listtemToSidenavHeaderSize();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  toggle(): void {
    this._facade.toggle();
  }

  teste(): void {
    console.log('CHAMOU');
  }

  private _listtemToSidenavHeaderSize() {
    const sidenavHeader =
      this._elementRef.nativeElement.querySelector('#sidenav-header');

    if (!sidenavHeader) {
      return;
    }

    fromEvent(sidenavHeader, 'resize')
      .pipe(takeUntil(this.destroyed$), mapTo(''), startWith(''))
      .subscribe({
        next: () => {
          this._facade.setSidenavHeaderHeight(sidenavHeader.clientHeight);
        },
      });
  }

  private _listenToSidenavItemsSize() {
    const sidenavItems =
      this._elementRef.nativeElement.querySelector('#sidenav-items');

    if (!sidenavItems) {
      return;
    }

    fromEvent(sidenavItems, 'resize')
      .pipe(takeUntil(this.destroyed$), mapTo(''), startWith(''))
      .subscribe({
        next: () => {
          this._facade.setSidenavWidth(sidenavItems.clientWidth);
        },
      });
  }
}
