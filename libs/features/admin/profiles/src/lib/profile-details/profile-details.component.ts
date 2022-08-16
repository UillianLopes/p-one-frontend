import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DestroyableMixin } from '@p-one/shared';
import { takeUntil } from 'rxjs';

import { ProfileDetailsStoreFacade } from './+state/profile-details-store.facade';

@Component({
  selector: 'p-one-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent
  extends DestroyableMixin()
  implements OnInit
{
  public readonly form = this._formBuilder.group({
    name: '',
    description: '',
  });

  public readonly applications$ = this._profileDetailsStoreFacade.applications$;
  public readonly profile$ = this._profileDetailsStoreFacade.profile$;

  public trackByTitle = (index: number, item: { title: string }) => item.title;
  public trackByDescription = (index: number, item: { description: string }) => item.description;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _profileDetailsStoreFacade: ProfileDetailsStoreFacade,
    private readonly _formBuilder: UntypedFormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this.profile$.pipe(takeUntil(this.destroyed$)).subscribe((profile) => {
      this.form.patchValue(profile ?? {});
    });

    this._profileDetailsStoreFacade.loadProfileAndRoles(
      this._activatedRoute.snapshot.params['profileId']
    );
  }

  public toggleRole(isChecked: boolean, key: string) {
    if (!isChecked) {
      this._profileDetailsStoreFacade.addRole(key);
    } else {
      this._profileDetailsStoreFacade.removeRole(key);
    }
  }
}
