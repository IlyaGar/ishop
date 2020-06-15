import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateFormComponent } from './navigate-form.component';

describe('NavigateFormComponent', () => {
  let component: NavigateFormComponent;
  let fixture: ComponentFixture<NavigateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
