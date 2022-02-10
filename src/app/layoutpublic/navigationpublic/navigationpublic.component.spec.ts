import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationpublicComponent } from './navigationpublic.component';

describe('NavigationpublicComponent', () => {
  let component: NavigationpublicComponent;
  let fixture: ComponentFixture<NavigationpublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationpublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
