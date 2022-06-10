import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditArtComponent } from './add-edit-art.component';

describe('AddEditArtComponent', () => {
  let component: AddEditArtComponent;
  let fixture: ComponentFixture<AddEditArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
