import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertRevokeDialogComponent } from './cert-revoke-dialog.component';

describe('CertRevokeDialogComponent', () => {
  let component: CertRevokeDialogComponent;
  let fixture: ComponentFixture<CertRevokeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertRevokeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertRevokeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
