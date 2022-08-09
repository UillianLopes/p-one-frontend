import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ButtonOptionColor, ButtonOptionStore } from './button-option.state';

@Component({
  selector: 'button[p-one-button-option]',
  templateUrl: './button-option.component.html',
  styleUrls: ['./button-option.component.scss'],
  host: {
    class: 'p-one-button-option',
  },
  encapsulation: ViewEncapsulation.None,
  providers: [ButtonOptionStore],
})
export class ButtonOptionComponent {
  
  public readonly class$ = this._store.class$;

  @Input()
  set color(color: ButtonOptionColor) {
    this._store.setColor(color);
  }

  constructor(private readonly _store: ButtonOptionStore) {}
}
