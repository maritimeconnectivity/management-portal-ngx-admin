import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsrLedgerSearchComponent } from './msr-ledger-search.component';

describe('MsrLedgerSearchComponent', () => {
  let component: MsrLedgerSearchComponent;
  let fixture: ComponentFixture<MsrLedgerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsrLedgerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsrLedgerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
