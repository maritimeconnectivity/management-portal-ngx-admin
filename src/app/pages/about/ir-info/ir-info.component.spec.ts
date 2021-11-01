import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrInfoComponent } from './ir-info.component';

describe('IrInfoComponent', () => {
  let component: IrInfoComponent;
  let fixture: ComponentFixture<IrInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
