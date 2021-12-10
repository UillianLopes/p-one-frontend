import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBalanceModalComponent } from './update-balance-modal.component';

describe('UpdateBalanceModalComponent', () => {
  let component: UpdateBalanceModalComponent;
  let fixture: ComponentFixture<UpdateBalanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBalanceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
