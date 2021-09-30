import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

import { DynamicFormRow } from '../@types/dynamic-form-row.config';
import { DynamicFormElementBase } from '../dynamic-form-element.base';

@Component({
  selector: 'p-one-dynamic-form-row',
  templateUrl: './dynamic-form-row.component.html',
  styleUrls: ['./dynamic-form-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormRowComponent
  extends DynamicFormElementBase
  implements OnInit
{
  @Input()
  config!: DynamicFormRow;

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _renderer2: Renderer2
  ) {
    super();
  }

  ngOnInit(): void {
    const elements = this.config.elements;

    if (elements && elements.length > 0) {
      const gridTemplateColumns = elements
        .map((elements) => elements.size ?? 'minmax(0px,1fr)')
        .reduce((columns, columnSize) => `${columns} ${columnSize}`);

      this._renderer2.setStyle(
        this._elementRef.nativeElement,
        'grid-template-columns',
        gridTemplateColumns
      );

      this._renderer2.setStyle(this._elementRef.nativeElement, 'gap', '16px');
    }
  }
}
