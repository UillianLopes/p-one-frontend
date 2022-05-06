import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

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

  @Input()
  set image(image: string) {
    this._store.setImage(image);
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._store.setIsLoading(isLoading);
  }

  constructor(private readonly _store: CardStore) {}
}
