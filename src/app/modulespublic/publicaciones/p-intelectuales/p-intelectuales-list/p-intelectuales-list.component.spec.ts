import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIntelectualesListComponent } from './p-intelectuales-list.component';

describe('PIntelectualesListComponent', () => {
  let component: PIntelectualesListComponent;
  let fixture: ComponentFixture<PIntelectualesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIntelectualesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PIntelectualesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
