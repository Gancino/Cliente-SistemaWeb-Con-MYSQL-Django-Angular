import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisDetailComponent } from './tesis-detail.component';

describe('TesisDetailComponent', () => {
  let component: TesisDetailComponent;
  let fixture: ComponentFixture<TesisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesisDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
