import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtonListComponent } from './input-button-list.component';

describe('InputButtonListComponent', () => {
  let component: InputButtonListComponent;
  let fixture: ComponentFixture<InputButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputButtonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
