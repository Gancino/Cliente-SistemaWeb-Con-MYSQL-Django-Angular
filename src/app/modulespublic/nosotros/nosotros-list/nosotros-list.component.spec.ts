import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosListComponent } from './nosotros-list.component';

describe('NosotrosListComponent', () => {
  let component: NosotrosListComponent;
  let fixture: ComponentFixture<NosotrosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosotrosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosotrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
