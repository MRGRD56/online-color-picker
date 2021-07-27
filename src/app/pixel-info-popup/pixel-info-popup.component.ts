import {AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ColorPickerImageService} from "../../services/color-picker-image/color-picker-image.service";
import {AppSettingsService} from "../../services/app-settings/app-settings.service";

@Component({
    selector: 'app-pixel-info-popup',
    templateUrl: './pixel-info-popup.component.html',
    styleUrls: ['./pixel-info-popup.component.scss']
})
export class PixelInfoPopupComponent implements AfterViewInit {
    public get x(): number {
        let cursorPositionX = this.colorPickerImageService.hoveredPixel?.screenPosition.x ?? 0;
        if (this.colorPickerImageService?.hoveredPixel
            && this.colorPickerImageService.hoveredPixel!.mouseEvent.clientX
            >= window.innerWidth - this.elementSize.width) {
            cursorPositionX -= this.elementSize.width;
        }
        return cursorPositionX;
    }
    public get y(): number {
        let cursorPositionY = this.colorPickerImageService.hoveredPixel?.screenPosition.y ?? 0;
        if (this.colorPickerImageService?.hoveredPixel
            && this.colorPickerImageService.hoveredPixel!.mouseEvent.clientY
            >= window.innerHeight - this.elementSize.height) {
            cursorPositionY -= this.elementSize.height;
        }
        return cursorPositionY;
    }

    public get scaledImageSize() {
        return this.appSettings.pixelInfoPopup.scaledImageSize;
    }

    public get elementSize() {
        return this.appSettings.pixelInfoPopup.elementSize;
    }

    public get currentPixelBorder() {
        const onePixelWidth = (this.elementSize.width - 2) / this.scaledImageSize;
        return {
            width: onePixelWidth + 'px',
            left: onePixelWidth * Math.floor(this.scaledImageSize / 2) + 'px'
        };
    }

    constructor(public readonly colorPickerImageService: ColorPickerImageService,
                private readonly appSettings: AppSettingsService) {
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

            canvasContext!.clearRect(0, 0, this.scaledImageSize, this.scaledImageSize);
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
