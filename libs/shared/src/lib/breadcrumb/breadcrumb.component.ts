import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { BreadcrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';

@Component({
  selector: 'p-one-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit, AfterContentInit {
  @ContentChildren(BreadcrumbItemComponent)
  public items?: QueryList<BreadcrumbItemComponent>;
  public items$?: Observable<BreadcrumbItemComponent[]>;

  constructor() {}
  ngAfterContentInit(): void {
    this.items$ = this.items?.changes.pipe(
      startWith(this.items?.map((item) => item)),
      map((items: BreadcrumbItemComponent[]) => items)
    );
  }

  ngOnInit(): void {}
}
