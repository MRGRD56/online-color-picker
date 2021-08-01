import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTextComponent } from './color-text.component';

describe('ColorTextComponent', () => {
  let component: ColorTextComponent;
  let fixture: ComponentFixture<ColorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
