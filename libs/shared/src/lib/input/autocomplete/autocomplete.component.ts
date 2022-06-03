import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'p-one-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'pOneAutocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent
  extends DestroyableMixin()
  implements AfterContentInit
{
  readonly formControl = new UntypedFormControl(null);

  @Output()
  readonly change$ = this.formControl.valueChanges;

  @Input()
  public displayFn?: (obj: any) => string;

  @ViewChild(TemplateRef)
  public template?: TemplateRef<any>;

  @ContentChildren(OptionComponent)
  public _options!: QueryList<OptionComponent>;
  public readonly options$ = new BehaviorSubject<OptionComponent[]>([]);

  constructor() {
    super();
  }

  ngAfterContentInit(): void {
    this._options.changes
      .pipe(
        takeUntil(this.destroyed$),
        startWith(this._options.map((opt) => opt))
      )
      .subscribe((options: OptionComponent[]) => {
        this.options$.next(options);
      });
  }

  select(value: any) {
    this.formControl.setValue(value);
  }
}
