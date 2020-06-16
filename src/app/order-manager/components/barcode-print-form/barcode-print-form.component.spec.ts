import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodePrintFormComponent } from './barcode-print-form.component';

describe('BarcodePrintFormComponent', () => {
  let component: BarcodePrintFormComponent;
  let fixture: ComponentFixture<BarcodePrintFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodePrintFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodePrintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
