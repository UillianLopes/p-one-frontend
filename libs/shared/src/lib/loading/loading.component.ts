import { Component, Input } from '@angular/core';

import { LoadingStore } from './loading.state';

@Component({
  selector: 'p-one-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  providers: [LoadingStore],
})
export class LoadingComponent {
  public readonly isSmall$ = this._loadingStore.isSmall$;

  @Input()
  public set size(size: 'small' | 'normal') {
    this._loadingStore.setSize(size);
  }

  @Input()
  public set withBackground(withBackground: boolean) {
    this._loadingStore.setWithBackground(withBackground);
  }

  public readonly withBackground$ = this._loadingStore.withBackground$;

  constructor(private readonly _loadingStore: LoadingStore) {}
}
