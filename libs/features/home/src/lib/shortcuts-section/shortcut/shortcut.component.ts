import { Component, Input } from '@angular/core';
import { Color } from '@p-one/shared';

import { ShortcutStore } from './shortcut.state';

@Component({
  selector: 'p-one-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
  providers: [ShortcutStore],
})
export class ShortcutComponent {
  readonly classes$ = this._store.classes$;

  @Input() set color(color: Color) {
    this._store.setColor(color);
  }

  constructor(private readonly _store: ShortcutStore) {}
}
