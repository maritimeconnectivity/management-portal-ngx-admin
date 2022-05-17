import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlEditDialogComponent } from './xml-edit-dialog.component';

describe('XmlEditDialogComponent', () => {
  let component: XmlEditDialogComponent;
  let fixture: ComponentFixture<XmlEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
