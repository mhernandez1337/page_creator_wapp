import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordingComponent } from './edit-recording.component';

describe('EditRecordingComponent', () => {
  let component: EditRecordingComponent;
  let fixture: ComponentFixture<EditRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
