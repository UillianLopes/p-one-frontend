import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWalletModalComponent } from './update-wallet-modal.component';

describe('UpdateBalanceModalComponent', () => {
  let component: UpdateWalletModalComponent;
  let fixture: ComponentFixture<UpdateWalletModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWalletModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWalletModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
