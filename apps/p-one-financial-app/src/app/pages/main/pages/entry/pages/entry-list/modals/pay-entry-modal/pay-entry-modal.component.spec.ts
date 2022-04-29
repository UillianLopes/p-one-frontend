import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEntryModalComponent } from './pay-entry-modal.component';

describe('PayEntryModalComponent', () => {
  let component: PayEntryModalComponent;
  let fixture: ComponentFixture<PayEntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayEntryModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
