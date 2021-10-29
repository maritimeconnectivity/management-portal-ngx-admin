import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplySvcComponent } from './apply-svc.component';

describe('ApplySvcComponent', () => {
  let component: ApplySvcComponent;
  let fixture: ComponentFixture<ApplySvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplySvcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplySvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
