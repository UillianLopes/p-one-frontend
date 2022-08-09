import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CreateStandaloneUserRequest, UserService } from '@p-one/domain/admin';
import { AuthenticationStoreFacade } from '@p-one/stores/identity';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface CreateStandaloneUserState {
  isLoading: boolean;
}

@Injectable()
export class CreateStandaloneUserStore extends ComponentStore<CreateStandaloneUserState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);

  constructor(
    private readonly _userService: UserService,
    private readonly _authenticationStore: AuthenticationStoreFacade
  ) {
    super({
      isLoading: false,
    });
  }

  public readonly createUser = this.effect(
    (event$: Observable<CreateStandaloneUserRequest>) =>
      event$.pipe(
        tap(() => this.setState({ isLoading: true })),
        switchMap((user) =>
          this._userService.createStandaloneUser(user).pipe(
            tap({
              next: () => {
                this._authenticationStore.signIn();
              },
              complete: () => this.setState({ isLoading: false }),
            })
          )
        )
      )
  );
}
