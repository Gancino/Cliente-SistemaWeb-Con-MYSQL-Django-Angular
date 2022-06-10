import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresosDetailComponent } from './congresos-detail.component';

describe('CongresosDetailComponent', () => {
  let component: CongresosDetailComponent;
  let fixture: ComponentFixture<CongresosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongresosDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
