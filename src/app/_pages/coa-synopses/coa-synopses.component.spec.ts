import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaSynopsesComponent } from './coa-synopses.component';

describe('CoaSynopsesComponent', () => {
  let component: CoaSynopsesComponent;
  let fixture: ComponentFixture<CoaSynopsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaSynopsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaSynopsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
