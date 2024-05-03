import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHearingsComponent } from './public-hearings.component';

describe('PublicHearingsComponent', () => {
  let component: PublicHearingsComponent;
  let fixture: ComponentFixture<PublicHearingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicHearingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHearingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
