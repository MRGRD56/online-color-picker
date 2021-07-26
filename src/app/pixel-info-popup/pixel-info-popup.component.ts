import {AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ColorPickerImageService} from "../../services/color-picker-image.service";

@Component({
    selector: 'app-pixel-info-popup',
    templateUrl: './pixel-info-popup.component.html',
    styleUrls: ['./pixel-info-popup.component.scss']
})
export class PixelInfoPopupComponent implements AfterViewInit {
    public get x(): number {
        let cursorPositionX = this.colorPickerImageService.hoveredPixel?.screenPosition.x ?? 0;
        if (this.elementSize && cursorPositionX >= document.documentElement.scrollWidth - this.elementSize.width) {
            cursorPositionX -= this.elementSize.width;
        }
        return cursorPositionX;
    }
    public get y(): number {
        let cursorPositionY = this.colorPickerImageService.hoveredPixel?.screenPosition.y ?? 0;
        if (this.elementSize && cursorPositionY >= document.documentElement.scrollHeight - this.elementSize.height) {
            cursorPositionY -= this.elementSize.height;
        }
        return cursorPositionY;
    }

    public readonly scaledImageSize: number = 7;

    public get currentPixelBorder() {
        return {
            width: 98 / this.scaledImageSize + 'px',
            left: Math.floor(49 - this.scaledImageSize) + 'px'
        };
    }

    public readonly elementSize = { width: 100, height: 140 };

    constructor(private readonly colorPickerImageService: ColorPickerImageService,
                private readonly elementRef: ElementRef<HTMLElement>) {
    }

    @ViewChild("imageMagnifierCanvas")
    private imageMagnifierCanvasRef!: ElementRef<HTMLCanvasElement>;
    private get imageMagnifierCanvas() {
        return this.imageMagnifierCanvasRef.nativeElement;
    }

    ngAfterViewInit(): void {
        const canvasContext = this.imageMagnifierCanvas.getContext("2d");
        // @ts-ignore
        canvasContext!.webkitImageSmoothingEnabled = false;
        // @ts-ignore
        canvasContext!.mozImageSmoothingEnabled = false;
        canvasContext!.imageSmoothingEnabled = false;
        this.colorPickerImageService.hoveredPixelChanged$.subscribe(hoveredPixel => {
            if (!this.colorPickerImageService.currentImageElement) return;

            canvasContext!.drawImage(
                this.colorPickerImageService.currentImageElement,
                hoveredPixel!.position.x - Math.floor(this.scaledImageSize / 2),
                hoveredPixel!.position.y - Math.floor(this.scaledImageSize / 2),
                this.scaledImageSize,
                this.scaledImageSize,
                0,
                0,
                this.scaledImageSize,
                this.scaledImageSize);
        });
    }
}
