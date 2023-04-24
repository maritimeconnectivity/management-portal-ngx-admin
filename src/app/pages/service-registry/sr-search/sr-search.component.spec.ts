import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrSearchComponent } from './sr-search.component';

describe('SrSearchComponent', () => {
  let component: SrSearchComponent;
  let fixture: ComponentFixture<SrSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
