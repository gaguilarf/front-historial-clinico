import { CanDeactivateFn } from '@angular/router';

export const guardGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
