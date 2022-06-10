import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisListComponent } from './tesis-list.component';

describe('TesisListComponent', () => {
  let component: TesisListComponent;
  let fixture: ComponentFixture<TesisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesisListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
