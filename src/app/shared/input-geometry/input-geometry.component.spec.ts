import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGeometryComponent } from './input-geometry.component';

describe('InputGeometryComponent', () => {
  let component: InputGeometryComponent;
  let fixture: ComponentFixture<InputGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputGeometryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
