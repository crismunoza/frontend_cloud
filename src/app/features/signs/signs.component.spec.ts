import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignsComponent } from './signs.component';

describe('SignsComponent', () => {
  let component: SignsComponent;
  let fixture: ComponentFixture<SignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
