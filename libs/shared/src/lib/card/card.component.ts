import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { Color } from '../@types';
import { CardStore } from './card.state';

@Component({
  selector: 'p-one-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CardStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public readonly isLoading$ = this._store.isLoading$;
  public readonly image$ = this._store.image$;
  public readonly class$ = this._store.class$;

  @Input()
  set image(image: string) {
    this._store.setImage(image);
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._store.setIsLoading(isLoading);
  }

  @Input()
  set color(color: Color) {
    this._store.setColor(color);
  }

  constructor(private readonly _store: CardStore) { }
}
