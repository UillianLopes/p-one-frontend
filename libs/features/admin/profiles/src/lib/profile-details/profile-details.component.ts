import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProfileDetailsStoreFacade } from './+state/profile-details-store.facade';

@Component({
  selector: 'p-one-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _profileDetailsStoreFacade: ProfileDetailsStoreFacade
  ) {}

  public ngOnInit(): void {
    this._profileDetailsStoreFacade.loadProfileRoles(
      this._activatedRoute.snapshot.params['profileId']
    );
  }
}
