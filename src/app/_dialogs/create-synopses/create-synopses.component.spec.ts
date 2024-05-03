import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSynopsesComponent } from './create-synopses.component';

describe('CreateSynopsesComponent', () => {
  let component: CreateSynopsesComponent;
  let fixture: ComponentFixture<CreateSynopsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSynopsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSynopsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
