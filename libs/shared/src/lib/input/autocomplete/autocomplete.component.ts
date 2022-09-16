import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
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
  implements AfterContentInit, OnInit
{
  readonly formControl = new UntypedFormControl(null);

  @Output()
  readonly valueChange = new EventEmitter<any>();

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
  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.valueChange.emit(value);
      });
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
