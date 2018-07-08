import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRemoveTaskComponent } from './popup-remove-task.component';

describe('PopupRemoveTaskComponent', () => {
  let component: PopupRemoveTaskComponent;
  let fixture: ComponentFixture<PopupRemoveTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRemoveTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRemoveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
