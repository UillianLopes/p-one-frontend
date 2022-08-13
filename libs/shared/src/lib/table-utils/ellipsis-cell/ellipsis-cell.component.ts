import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'td[p-one-ellipsis-cell],th[p-one-ellipsis-cell]',
  templateUrl: './ellipsis-cell.component.html',
  styleUrls: ['./ellipsis-cell.component.scss'],
})
export class EllipsisCellComponent {
  @Input()
  @HostBinding('style.width.px')
  public width: number = 200;

  @Input()
  tooltip?: string;
}
