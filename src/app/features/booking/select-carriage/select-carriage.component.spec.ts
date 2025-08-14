import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCarriageComponent } from './select-carriage.component';

describe('SelectCarriageComponent', () => {
  let component: SelectCarriageComponent;
  let fixture: ComponentFixture<SelectCarriageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCarriageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectCarriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
