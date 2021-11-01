import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrInfoComponent } from './sr-info.component';

describe('SrInfoComponent', () => {
  let component: SrInfoComponent;
  let fixture: ComponentFixture<SrInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
