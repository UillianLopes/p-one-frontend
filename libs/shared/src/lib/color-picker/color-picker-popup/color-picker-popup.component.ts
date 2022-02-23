import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ColorPickerPopupStore } from './color-picker-popup.state';

@Component({
  selector: 'p-one-color-picker-popup',
  templateUrl: './color-picker-popup.component.html',
  styleUrls: ['./color-picker-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ColorPickerPopupStore],
})
export class ColorPickerPopupComponent implements OnInit {
  public readonly initialColor$ = this._store.initialColor$;
  public readonly color$ = this._store.color$;
  public readonly confirmed$ = new Subject();

  constructor(private readonly _store: ColorPickerPopupStore) {}

  public ngOnInit(): void {}

  public setColor(color: string): void {
    this._store.setColor(color);
  }

  public setInitialColor(color: string): void {
    this._store.setInitialColor(color);
  }
}
