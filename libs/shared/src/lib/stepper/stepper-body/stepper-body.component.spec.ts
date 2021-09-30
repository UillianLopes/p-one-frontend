import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperBodyComponent } from './stepper-body.component';

describe('StepperBodyComponent', () => {
  let component: StepperBodyComponent;
  let fixture: ComponentFixture<StepperBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
