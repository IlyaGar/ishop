import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFormComponent } from './empty-form.component';

describe('EmptyFormComponent', () => {
  let component: EmptyFormComponent;
  let fixture: ComponentFixture<EmptyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
