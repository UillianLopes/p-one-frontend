import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { StepComponent } from '../step/step.component';
import { StepperHeaderComponent } from '../stepper-header/stepper-header.component';

@Component({
  selector: 'p-one-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepHeaderComponent
  extends DestroyableMixin()
  implements OnDestroy
{
  @Input()
  step!: StepComponent;

  @Input()
  stepIndex!: number;

  @Input()
  selected$: Observable<boolean>;

  constructor(private readonly _header: StepperHeaderComponent) {
    super();

    this.selected$ = this._header.selectedStep$.pipe(
      map(({ selectedStepIndex }) => {
        return selectedStepIndex == this.stepIndex;
      })
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  @HostListener('click')
  click(): void {
    this._header.goTo(this.stepIndex);
  }
}
