import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonpublicComponent } from './skeletonpublic.component';

describe('SkeletonpublicComponent', () => {
  let component: SkeletonpublicComponent;
  let fixture: ComponentFixture<SkeletonpublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonpublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
