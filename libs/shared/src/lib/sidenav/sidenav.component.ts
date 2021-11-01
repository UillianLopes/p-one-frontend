import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';

import { DestroyableMixin } from '../..';
import { SidenavFacade } from './+state/sidenav.facade';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { sidenavHeaderAnimation, sidenavPaddingAnimation, sidenavWidthAnimation } from './sidenav.animations';

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

  public readonly state$ = this._facade.state$.pipe(shareReplay());
  public readonly isFixed$ = this._facade.isFixed$;
  public readonly isFloating$ = this._facade.isFloating$;
  public readonly sidenaHeaderState$ = this.state$.pipe(delay(10));

  constructor(
    private readonly _facade: SidenavFacade,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {
    super();
  }
  ngAfterContentInit(): void {
    this._setSidenavWidthToContent();
  }

  toggle(): void {
    this._facade.toggle();
  }

  private _setSidenavWidthToContent() {
    const sidenavItems =
      this._elementRef.nativeElement.querySelector('#sidenav-items');

    if (!sidenavItems) {
      return;
    }

    this._facade.setSidenavWidth(sidenavItems.clientWidth);
  }
}
