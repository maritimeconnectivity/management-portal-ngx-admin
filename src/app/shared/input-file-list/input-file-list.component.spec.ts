import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileListComponent } from './input-file-list.component';

describe('InputFileListComponent', () => {
  let component: InputFileListComponent;
  let fixture: ComponentFixture<InputFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
