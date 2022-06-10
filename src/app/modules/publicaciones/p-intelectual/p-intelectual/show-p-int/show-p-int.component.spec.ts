import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPIntComponent } from './show-p-int.component';

describe('ShowPIntComponent', () => {
  let component: ShowPIntComponent;
  let fixture: ComponentFixture<ShowPIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
