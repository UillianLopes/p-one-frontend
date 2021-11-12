import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubCategoryModalComponent } from './create-sub-category-modal.component';

describe('CreateSubCategoryModalComponent', () => {
  let component: CreateSubCategoryModalComponent;
  let fixture: ComponentFixture<CreateSubCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
