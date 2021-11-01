import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'p-one-filter-display-badge',
  templateUrl: './filter-display-badge.component.html',
  styleUrls: ['./filter-display-badge.component.scss'],
})
export class FilterDisplayBadgeComponent implements OnInit {
  @Input()
  name?: string;

  @Input()
  value?: string[] | string | number | number[];

  constructor() {}

  ngOnInit(): void {}
}
