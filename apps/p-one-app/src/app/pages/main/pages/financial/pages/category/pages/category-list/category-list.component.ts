import { Component, OnDestroy, OnInit } from '@angular/core';

import { CategoryListFacade } from './+state/category-list.facade';

@Component({
  selector: 'p-one-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public readonly categories$ = this._facade.categories$;
  public readonly isLoading$ = this._facade.isLoading$;
  
  constructor(private readonly _facade: CategoryListFacade) {}
  ngOnDestroy(): void {
    this._facade.resetState();
  }

  ngOnInit(): void {
    this._facade.loadCategories();
  }
}
