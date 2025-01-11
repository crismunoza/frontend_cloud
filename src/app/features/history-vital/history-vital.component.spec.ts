import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVitalComponent } from './history-vital.component';

describe('HistoryVitalComponent', () => {
  let component: HistoryVitalComponent;
  let fixture: ComponentFixture<HistoryVitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryVitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
