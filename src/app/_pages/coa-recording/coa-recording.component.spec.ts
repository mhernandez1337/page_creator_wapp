import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaRecordingComponent } from './coa-recording.component';

describe('CoaRecordingComponent', () => {
  let component: CoaRecordingComponent;
  let fixture: ComponentFixture<CoaRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaRecordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
