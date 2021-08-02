import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {ColorPickerImageService} from "../../services/color-picker-image/color-picker-image.service";
import Point from "../../models/Point";
import Pixel from "../../models/Pixel";
import {getColorHex, getColorRgb} from "../../extensions/colors";
import {AppSettingsService} from "../../services/app-settings/app-settings.service";
import {ColorMode} from "../../models/ColorMode";
import Color from "../../models/Color";

@Component({
    selector: "app-image-color-picker",
    templateUrl: "./image-color-picker.component.html",
    styleUrls: ["./image-color-picker.component.scss"]
})
export class ImageColorPickerComponent implements AfterViewInit {
    @ViewChild("imageCanvas")
    private imageCanvasRef!: ElementRef<HTMLCanvasElement>;

    private get imageCanvas(): HTMLCanvasElement {
        return this.imageCanvasRef.nativeElement;
    }

    @ViewChild("imageCanvasWrapper")
    private imageCanvasWrapperRef!: ElementRef<HTMLDivElement>;

    private get imageCanvasWrapper(): HTMLDivElement {
        return this.imageCanvasWrapperRef.nativeElement;
    }

    private imageCanvasContext!: CanvasRenderingContext2D;

    public isDragging = false;

    private get isInvertedDragScrolling() {
        return this.appSettings.colorPicker.isInvertedDragScrolling;
    }

    private get dragScrollingSpeed() {
        return this.appSettings.colorPicker.dragScrollingSpeed;
    }

    constructor(public readonly colorPickerImageService: ColorPickerImageService,
                public readonly appSettings: AppSettingsService) {
        console.log("image-color-picker: ctor");
        window.addEventListener("mousemove", this.windowOnMouseMove);
        window.addEventListener("mouseup", this.windowOnMouseUp);
    }

    ngAfterViewInit(): void {
        console.log("image-color-picker: ngAfterViewInit");
        const canvasContext = this.imageCanvas.getContext("2d");
        if (canvasContext) {
            this.imageCanvasContext = canvasContext;
        } else {
            throw this.imageCanvas;
        }

        this.colorPickerImageService.currentImageChanged$.subscribe(_ => {
            this.colorPickerImageService.renderImage(this.imageCanvas);
        });
    }

    public isMouseOverImage: boolean = false;

    private previousMouseMovement?: MouseEvent;

    private isDraggingJustCompleted = false;

    public canvasOnMouseMove(e: MouseEvent) {
        if (this.isMouseDown && this.mouseDownPosition && this.previousMouseMovement) {
            const shiftFromStart = new Point(
                e.clientX - this.mouseDownPosition.clientX,
                e.clientY - this.mouseDownPosition.clientY
            );
            const shift = new Point(
                e.clientX - this.previousMouseMovement.clientX,
                e.clientY - this.previousMouseMovement.clientY
            );
            if (!this.isDragging && Math.sqrt(Math.pow(shiftFromStart.x, 2) + Math.pow(shiftFromStart.y, 2)) > 5) {
                this.isDragging = true;
            }
            if (this.isDragging) {
                const scrollingMultiplier = (this.isInvertedDragScrolling ? 1 : -1) * this.dragScrollingSpeed;
                this.imageCanvasWrapper.scrollLeft += (shift.x * scrollingMultiplier);
                this.imageCanvasWrapper.scrollTop += (shift.y * scrollingMultiplier);
            }
        }
        if (!this.isDragging) {
            this.colorPickerImageService.hoveredPixel = this.getPixelFromMouseEvent(e);
        }

        this.previousMouseMovement = e;
    }

    public canvasOnMouseClick(e: MouseEvent) {
        if (this.isDragging || this.isDraggingJustCompleted) {
            if (this.isDraggingJustCompleted) {
                this.isDraggingJustCompleted = false;
            }
            return;
        }
        this.colorPickerImageService.selectedPixel = this.getPixelFromMouseEvent(e);
    }

    public canvasOnMouseOver(e: MouseEvent) {
        this.isMouseOverImage = true;
    }

    public canvasOnMouseOut(e: MouseEvent) {
        this.isMouseOverImage = false;
        this.isMouseDown = false;
    }

    private static getCanvasRelativePosition(canvasElement: HTMLCanvasElement, mouseEvent: MouseEvent): Point {
        return new Point(mouseEvent.offsetX, mouseEvent.offsetY);
    }

    private getPixelFromMouseEvent(e: MouseEvent): Pixel {
        const pixelPosition = ImageColorPickerComponent.getCanvasRelativePosition(this.imageCanvas, e);
        const colorPixelsCount = this.appSettings.colorPicker.colorPixelsCount;
        const leftShift = Math.floor((colorPixelsCount - 1) / 2);
        const getImageDataSourceCoordinate = (pixelPositionCoordinate: number) => {
            const coordinate = pixelPositionCoordinate - leftShift;
            return coordinate < 0 ? 0 : coordinate;
        };
        const getImageDataSize = (imageSize: number, pixelPositionCoordinate: number) => {
            const brCornerDistance = (imageSize - 1) - (pixelPositionCoordinate + Math.ceil((colorPixelsCount - 1) / 2));
            return brCornerDistance > 0 ? colorPixelsCount : colorPixelsCount + brCornerDistance;
        };
        const imageData = this.imageCanvasContext.getImageData(
            getImageDataSourceCoordinate(pixelPosition.x),
            getImageDataSourceCoordinate(pixelPosition.y),
            getImageDataSize(this.colorPickerImageService.currentImageSize!.width, pixelPosition.x),
            getImageDataSize(this.colorPickerImageService.currentImageSize!.height, pixelPosition.y));
        const pixelData = imageData.data;

        const pixelsCount = imageData.width * imageData.height;
        const colorComponents = {r: 0, g: 0, b: 0, a: 0};
        for (let pixelIndex = 0; pixelIndex < pixelData.length; pixelIndex += 4) {
            colorComponents.r += pixelData[pixelIndex];
            colorComponents.g += pixelData[pixelIndex + 1];
            colorComponents.b += pixelData[pixelIndex + 2];
            colorComponents.a += pixelData[pixelIndex + 3];
        }
        const color = [
            Math.floor(colorComponents.r / pixelsCount),
            Math.floor(colorComponents.g / pixelsCount),
            Math.floor(colorComponents.b / pixelsCount),
            Math.floor(colorComponents.a / pixelsCount)
        ];

        return {
            screenPosition: new Point(e.pageX, e.pageY),
            position: pixelPosition,
            color: new Color(color[0], color[1], color[2], color[3]),
            mouseEvent: e
        };
    }

    private _isMouseDown = false;
    private get isMouseDown(): boolean {
        return this._isMouseDown;
    }

    private set isMouseDown(value: boolean) {
        this._isMouseDown = value;
        if (!this._isMouseDown) {
            this.isDragging = false;
        }
    }

    private mouseDownPosition?: MouseEvent | null;

    public canvasOnMouseDown(e: MouseEvent) {
        if (!this.isMouseDown) {
            this.isMouseDown = true;
            this.mouseDownPosition = e;
        }
    }

    public canvasOnMouseUp(e: MouseEvent) {
        if (this.isMouseDown) {
            this.mouseDownPosition = null;
            this.colorPickerImageService.hoveredPixel = this.getPixelFromMouseEvent(e);
            if (this.isDragging) {
                this.isDraggingJustCompleted = true;
            }
            this.isMouseDown = false;
        }
    }

    private windowOnMouseMove(e: MouseEvent) {

    }

    private windowOnMouseUp(e: MouseEvent) {

    }
}
