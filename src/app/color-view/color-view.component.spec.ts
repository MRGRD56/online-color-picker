import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ColorViewComponent } from "./color-view.component";

describe("ColorViewComponent", () => {
    let component: ColorViewComponent;
    let fixture: ComponentFixture<ColorViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ColorViewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
