import { Component, Input, OnInit } from '@angular/core';

import { ListItemStore } from './list-item.state';

@Component({
  selector: 'p-one-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  providers: [ListItemStore],
})
export class ListItemComponent implements OnInit {
  @Input()
  set itemId(id: string) {
    this._store.loadItem(id);
  }

  public readonly item$ = this._store.item$;

  constructor(private readonly _store: ListItemStore) {}

  ngOnInit(): void {}
}
