import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOrgComponent } from './approve-org.component';

describe('ApproveOrgComponent', () => {
  let component: ApproveOrgComponent;
  let fixture: ComponentFixture<ApproveOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
