import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSvcComponent } from './approve-svc.component';

describe('ApproveSvcComponent', () => {
  let component: ApproveSvcComponent;
  let fixture: ComponentFixture<ApproveSvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSvcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
