import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuceneLogicInputComponent } from './lucene-logic-input.component';

describe('LuceneLogicInputComponent', () => {
  let component: LuceneLogicInputComponent;
  let fixture: ComponentFixture<LuceneLogicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuceneLogicInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuceneLogicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
