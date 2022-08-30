import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroStrategyComponent } from './micro-strategy.component';

describe('MicroStrategyComponent', () => {
  let component: MicroStrategyComponent;
  let fixture: ComponentFixture<MicroStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
