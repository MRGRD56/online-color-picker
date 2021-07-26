import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelInfoPopupComponent } from './pixel-info-popup.component';

describe('PixelInfoPopupComponent', () => {
  let component: PixelInfoPopupComponent;
  let fixture: ComponentFixture<PixelInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
