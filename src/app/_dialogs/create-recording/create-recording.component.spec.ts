import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecordingComponent } from './create-recording.component';

describe('CreateRecordingComponent', () => {
  let component: CreateRecordingComponent;
  let fixture: ComponentFixture<CreateRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
