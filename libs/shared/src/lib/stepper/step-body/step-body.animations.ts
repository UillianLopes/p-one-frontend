import { state, style, trigger } from '@angular/animations';

export const stepBodyAnimation = trigger('stepBodyAnimation', [
  state(
    'selected',
    style({
      display: 'block',
    })
  ),
  state(
    'selected-from-left',
    style({
      display: 'block',
    })
  ),
  state(
    'selected-from-right',
    style({
      display: 'block',
    })
  ),

  state(
    'unselected',
    style({
      display: 'none',
    })
  ),
  state(
    'unselected-from-left',
    style({
      display: 'none',
    })
  ),
  state(
    'unselected-from-right',
    style({
      display: 'none',
    })
  ),
]);
