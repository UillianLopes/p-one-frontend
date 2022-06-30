import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainNotificationsDisplayButtonComponent } from './notifications-display-button.component';

describe('DomainNotificationsDisplayButtonComponent', () => {
  let component: DomainNotificationsDisplayButtonComponent;
  let fixture: ComponentFixture<DomainNotificationsDisplayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainNotificationsDisplayButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      DomainNotificationsDisplayButtonComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
