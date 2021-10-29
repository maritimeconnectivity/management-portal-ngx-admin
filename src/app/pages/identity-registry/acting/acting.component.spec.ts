import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActingComponent } from './acting.component';

describe('ActingComponent', () => {
  let component: ActingComponent;
  let fixture: ComponentFixture<ActingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
