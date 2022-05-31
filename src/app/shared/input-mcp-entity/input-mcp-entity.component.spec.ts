import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMcpEntityComponent } from './input-mcp-entity.component';

describe('InputMcpEntityComponent', () => {
  let component: InputMcpEntityComponent;
  let fixture: ComponentFixture<InputMcpEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMcpEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMcpEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
