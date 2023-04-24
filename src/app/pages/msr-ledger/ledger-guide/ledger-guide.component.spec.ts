import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerGuideComponent } from './ledger-guide.component';

describe('LedgerGuideComponent', () => {
  let component: LedgerGuideComponent;
  let fixture: ComponentFixture<LedgerGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
