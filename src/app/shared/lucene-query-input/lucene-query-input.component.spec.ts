import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuceneQueryInputComponent } from './lucene-query-input.component';

describe('LuceneQueryInputComponent', () => {
  let component: LuceneQueryInputComponent;
  let fixture: ComponentFixture<LuceneQueryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuceneQueryInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuceneQueryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
