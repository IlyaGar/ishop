import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeInputCountFormComponent } from './barcode-input-count-form.component';

describe('BarcodeInputCountFormComponent', () => {
  let component: BarcodeInputCountFormComponent;
  let fixture: ComponentFixture<BarcodeInputCountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeInputCountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeInputCountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
