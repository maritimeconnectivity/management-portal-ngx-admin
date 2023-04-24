import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrGuideComponent } from './sr-guide.component';

describe('SrGuideComponent', () => {
  let component: SrGuideComponent;
  let fixture: ComponentFixture<SrGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
