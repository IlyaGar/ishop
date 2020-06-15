import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdListComponent } from './ord-list.component';

describe('OrdListComponent', () => {
  let component: OrdListComponent;
  let fixture: ComponentFixture<OrdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
