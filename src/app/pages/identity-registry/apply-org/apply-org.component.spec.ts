import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyOrgComponent } from './apply-org.component';

describe('ApplyOrgComponent', () => {
  let component: ApplyOrgComponent;
  let fixture: ComponentFixture<ApplyOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
