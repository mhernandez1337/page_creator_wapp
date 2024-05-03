import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsesComponent } from './synopses.component';

describe('SynopsesComponent', () => {
  let component: SynopsesComponent;
  let fixture: ComponentFixture<SynopsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynopsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
