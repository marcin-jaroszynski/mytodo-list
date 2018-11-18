import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModifyTaskComponent } from './popup-modify-task.component';

describe('PopupModifyTaskComponent', () => {
  let component: PopupModifyTaskComponent;
  let fixture: ComponentFixture<PopupModifyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupModifyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupModifyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
