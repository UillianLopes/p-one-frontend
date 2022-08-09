import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubCategoryModalComponent } from './delete-sub-category-modal.component';

describe('DeleteSubCategoryModalComponent', () => {
  let component: DeleteSubCategoryModalComponent;
  let fixture: ComponentFixture<DeleteSubCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSubCategoryModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
