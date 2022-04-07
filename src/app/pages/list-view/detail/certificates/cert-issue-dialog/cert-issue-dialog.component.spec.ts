import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertIssueDialogComponent } from './cert-issue-dialog.component';

describe('CertIssueDialogComponent', () => {
  let component: CertIssueDialogComponent;
  let fixture: ComponentFixture<CertIssueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertIssueDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertIssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
