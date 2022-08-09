import { AfterContentInit, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins';
import { DetailsInputDirective } from '../details-input.directive';
import { DetailsFieldStore } from './details-field.state';

@Component({
  selector: 'p-one-details-field',
  templateUrl: './details-field.component.html',
  styleUrls: ['./details-field.component.scss'],
  providers: [DetailsFieldStore],
})
export class DetailsFieldComponent
  extends DestroyableMixin()
  implements AfterContentInit
{
  @ContentChild(DetailsInputDirective) input?: DetailsInputDirective;

  public readonly isDisabled$ = this._store.isDisabled$;
  public readonly isEditing$ = this._store.isEditing$;
  public readonly canEdit$ = this._store.canEdit$;

  @Input()
  public set isEditing(isEditing: boolean) {
    this._store.setIsEditing(isEditing);
  }

  @Input()
  public set canEdit(canEdit: boolean) {
    this._store.setCanEdit(canEdit);
  }

  @Output() public readonly confirmed = new EventEmitter();

  constructor(private readonly _store: DetailsFieldStore) {
    super();
  }

  public ngAfterContentInit(): void {
    this.isEditing$.pipe(takeUntil(this.destroyed$)).subscribe((isEditing) => {
      if (isEditing) {
        this.input?.enableField();
      } else {
        this.input?.disabledField();
      }
    });
  }

  public makeTheFieldEditable(): void {
    this._store.setIsEditing(true);
  }

  public confirm(): void {
    if (this.input && this.input.isDirty) {
      this.input.markAsPristine();
      this.confirmed.emit();
    }

    this._store.setIsEditing(false);
  }
}
