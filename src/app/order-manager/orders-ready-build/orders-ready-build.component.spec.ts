import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReadyBuildComponent } from './orders-ready-build.component';

describe('OrdersReadyBuildComponent', () => {
  let component: OrdersReadyBuildComponent;
  let fixture: ComponentFixture<OrdersReadyBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersReadyBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersReadyBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
