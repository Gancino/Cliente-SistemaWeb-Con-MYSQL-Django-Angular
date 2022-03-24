import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosDetailComponent } from './nosotros-detail.component';

describe('NosotrosDetailComponent', () => {
  let component: NosotrosDetailComponent;
  let fixture: ComponentFixture<NosotrosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosotrosDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosotrosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
