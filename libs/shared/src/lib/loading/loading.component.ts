import { Component, Input, OnInit } from '@angular/core';

import { LoadingStore } from './loading.state';

@Component({
  selector: 'p-one-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  providers: [LoadingStore],
})
export class LoadingComponent implements OnInit {
  public readonly isSmall$ = this._loadingStore.isSmall$;

  @Input() public set size(size: 'small' | 'normal') {
    this._loadingStore.setSize(size);
  }

  constructor(private readonly _loadingStore: LoadingStore) {}

  ngOnInit(): void {}
}
