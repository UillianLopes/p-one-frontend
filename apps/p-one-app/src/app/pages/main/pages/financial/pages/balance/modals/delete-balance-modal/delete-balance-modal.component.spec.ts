import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBalanceModalComponent } from './delete-balance-modal.component';

describe('DeleteBalanceModalComponent', () => {
  let component: DeleteBalanceModalComponent;
  let fixture: ComponentFixture<DeleteBalanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBalanceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
