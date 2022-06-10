import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIntelectualesDetailComponent } from './p-intelectuales-detail.component';

describe('PIntelectualesDetailComponent', () => {
  let component: PIntelectualesDetailComponent;
  let fixture: ComponentFixture<PIntelectualesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIntelectualesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PIntelectualesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
