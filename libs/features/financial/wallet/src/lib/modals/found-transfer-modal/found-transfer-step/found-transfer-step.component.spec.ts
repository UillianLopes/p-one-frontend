import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTransferStepComponent } from './found-transfer-step.component';

describe('FoundTransferStepComponent', () => {
  let component: FoundTransferStepComponent;
  let fixture: ComponentFixture<FoundTransferStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundTransferStepComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundTransferStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
