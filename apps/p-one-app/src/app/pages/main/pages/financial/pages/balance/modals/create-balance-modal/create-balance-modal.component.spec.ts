import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBalanceModalComponent } from './create-balance-modal.component';

describe('CreateBalanceModalComponent', () => {
  let component: CreateBalanceModalComponent;
  let fixture: ComponentFixture<CreateBalanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBalanceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
