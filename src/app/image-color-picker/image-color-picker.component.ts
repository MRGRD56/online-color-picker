import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ColorPickerImageService} from "../../services/color-picker-image.service";
import Point from "../../models/Point";
import Pixel from "../../models/Pixel";
import {rgbToHex} from "../../main";

@Component({
    selector: 'app-image-color-picker',
    templateUrl: './image-color-picker.component.html',
    styleUrls: ['./image-color-picker.component.scss']
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

    constructor(private readonly colorPickerImageService: ColorPickerImageService) {

    }

    ngAfterViewInit(): void {
        const canvasContext = this.imageCanvas.getContext("2d");
        if (canvasContext) {
            this.imageCanvasContext = canvasContext;
        } else {
            throw this.imageCanvas;
        }

        this.colorPickerImageService.currentImageChanged$.subscribe(imageUrl => {
            this.colorPickerImageService.currentImageElement = new Image();
            this.colorPickerImageService.currentImageElement.onload = () => {
                this.imageCanvas.width = this.colorPickerImageService.currentImageElement!.width;
                this.imageCanvas.height = this.colorPickerImageService.currentImageElement!.height;
                this.imageCanvasContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
                this.imageCanvasContext.drawImage(this.colorPickerImageService.currentImageElement!, 0, 0);
            };
            this.colorPickerImageService.currentImageElement.src = imageUrl;
        });
    }

    public isMouseOverImage: boolean = false;

    private previousMouseMovement?: MouseEvent;

    public canvasOnMouseMove(e: MouseEvent) {
        this.colorPickerImageService.hoveredPixel = this.getPixelFromMouseEvent(e);
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
                this.imageCanvasWrapper.scrollLeft -= shift.x;
                this.imageCanvasWrapper.scrollTop -= shift.y;
            }
        }

        this.previousMouseMovement = e;
    }

    public canvasOnMouseClick(e: MouseEvent) {
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
        // const canvasElementBoundingClientRect = canvasElement.getBoundingClientRect();
        // const canvasSize = { width: canvasElement.width, height: canvasElement.height };
        // const canvasElementSize = { width: canvasElementBoundingClientRect.width, height: canvasElementBoundingClientRect.height };
        // const canvasElementRelativeCursorPosition = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
        // return new Point(
        //     canvasSize.width / canvasElementSize.width * canvasElementRelativeCursorPosition.x,
        //     canvasSize.height / canvasElementSize.height * canvasElementRelativeCursorPosition.y);
        return new Point(mouseEvent.offsetX, mouseEvent.offsetY);
    }

    private getPixelFromMouseEvent(e: MouseEvent): Pixel {
        const pixelPosition = ImageColorPickerComponent.getCanvasRelativePosition(this.imageCanvas, e);
        const p = this.imageCanvasContext.getImageData(pixelPosition.x, pixelPosition.y, 1, 1).data;
        const hexColor = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        const rgbColor = `rgb(${p[0]},${p[1]},${p[2]})`;
        return {
            screenPosition: new Point(e.pageX, e.pageY),
            position: pixelPosition,
            hex: hexColor,
            rgb: rgbColor,
            mouseEvent: e
        };
    }

    private _isMouseDown = false;
    get isMouseDown(): boolean {
        return this._isMouseDown;
    }
    set isMouseDown(value: boolean) {
        this._isMouseDown = value;
        if (!this._isMouseDown) {
            this.isDragging = false;
        }
    }

    private mouseDownPosition?: MouseEvent | null;

    canvasOnMouseDown(e: MouseEvent) {
        if (!this.isMouseDown) {
            this.isMouseDown = true;
            this.mouseDownPosition = e;
        }
    }

    canvasOnMouseUp(e: MouseEvent) {
        if (this.isMouseDown) {
            this.isMouseDown = false;
            this.mouseDownPosition = null;
        }
    }
}
