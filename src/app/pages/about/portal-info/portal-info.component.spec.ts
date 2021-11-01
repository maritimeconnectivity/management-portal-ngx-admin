import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalInfoComponent } from './portal-info.component';

describe('PortalInfoComponent', () => {
  let component: PortalInfoComponent;
  let fixture: ComponentFixture<PortalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
