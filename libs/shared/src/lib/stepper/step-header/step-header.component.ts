import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { StepHeaderStore } from './step-header.state';

@Component({
  selector: 'p-one-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StepHeaderStore],
})
export class StepHeaderComponent extends DestroyableMixin() {
  @Input()
  public set isValid(isValid: boolean) {
    this._stepperHeaderStore.setIsValid(isValid);
  }

  @Input()
  public set isSelected(isSelected: boolean) {
    this._stepperHeaderStore.setIsSelected(isSelected);
  }

  public readonly isValid$ = this._stepperHeaderStore.isValid$;
  public readonly isSelected$ = this._stepperHeaderStore.isSelected$;

  constructor(private readonly _stepperHeaderStore: StepHeaderStore) {
    super();
  }
}
