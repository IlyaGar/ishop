import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCanceledComponent } from './orders-canceled.component';

describe('OrdersCanceledComponent', () => {
  let component: OrdersCanceledComponent;
  let fixture: ComponentFixture<OrdersCanceledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCanceledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCanceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
