import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSynopsesComponent } from './edit-synopses.component';

describe('EditSynopsesComponent', () => {
  let component: EditSynopsesComponent;
  let fixture: ComponentFixture<EditSynopsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSynopsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSynopsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
