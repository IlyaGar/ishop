import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReturnProductComponent } from './confirm-return-product.component';

describe('ConfirmReturnProductComponent', () => {
  let component: ConfirmReturnProductComponent;
  let fixture: ComponentFixture<ConfirmReturnProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmReturnProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReturnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
