import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { StepComponent } from '../step/step.component';
import { StepperStateService } from '../stepper-state.service';

@Component({
  selector: 'p-one-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepHeaderComponent extends DestroyableMixin() {
  @Input()
  public step!: StepComponent;

  @Input()
  public stepIndex!: number;

  @Input()
  public readonly selected$ = this._stepperState.selectedStep$.pipe(
    map((selectedStep) => {
      return selectedStep === this.stepIndex;
    })
  );

  constructor(private readonly _stepperState: StepperStateService) {
    super();
  }

  @HostListener('click')
  click(): void {
    this._stepperState.setSelectedIndex(this.stepIndex);
  }
}
