import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListFilterComponent } from './entry-list-filter.component';

describe('EntryListFilterComponent', () => {
  let component: EntryListFilterComponent;
  let fixture: ComponentFixture<EntryListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryListFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
