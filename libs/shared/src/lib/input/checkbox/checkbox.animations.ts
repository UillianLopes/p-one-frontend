import { animate, state, style, transition, trigger } from '@angular/animations';

export const checkboxCheckmarkAnimation = trigger(
  'checkboxCheckmarkAnimation',
  [
    state(
      'unchecked',
      style({
        opacity: 0,
        transform: 'rotateZ(-90deg)',
      })
    ),
    state(
      'checked',
      style({
        opacity: 1,
        transform: 'rotateZ(0deg)',
      })
    ),

    state(
      'indeterminated',
      style({
        opacity: 0,
        transform: 'rotateZ(90deg)',
      })
    ),

    transition('checked => unchecked', animate('.2s linear')),
    transition('unchecked => checked', animate('.2s linear')),
  ]
);

export const checkboxMinusAnimation = trigger('checkboxMinusAnimation', [
  state(
    'unchecked',
    style({
      opacity: 0,
      transform: 'rotateZ(90deg)',
    })
  ),
  state(
    'checked',
    style({
      opacity: 0,
      transform: 'rotateZ(-90deg)',
    })
  ),

  state(
    'indeterminated',
    style({
      opacity: 1,
      transform: 'rotateZ(0deg)',
    })
  ),

  transition('checked => unchecked', animate('.2s linear')),
  transition('unchecked => checked', animate('.2s linear')),

  transition('unchecked => indeterminated', animate('.2s linear')),
  transition('checked => indeterminated', animate('.2s linear')),

  transition('indeterminated => unchecked', animate('.2s linear')),
  transition('indeterminated => checked', animate('.2s linear')),
]);
