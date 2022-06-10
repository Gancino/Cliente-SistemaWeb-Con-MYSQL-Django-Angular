import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresosListComponent } from './congresos-list.component';

describe('CongresosListComponent', () => {
  let component: CongresosListComponent;
  let fixture: ComponentFixture<CongresosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongresosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
