import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ColorPickerImageService} from "../../services/color-picker-image.service";
import Point from "../../models/Point";
import Pixel from "../../models/Pixel";

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

    private imageCanvasContext!: CanvasRenderingContext2D;

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
                this.imageCanvasContext.drawImage(this.colorPickerImageService.currentImageElement!, 0, 0);
            };
            this.colorPickerImageService.currentImageElement.src = imageUrl;
        });
    }

    public isMouseOverImage: boolean = false;

    public canvasOnMouseMove(e: MouseEvent) {
        this.colorPickerImageService.hoveredPixel = this.getPixelFromMouseEvent(e);
    }

    public canvasOnMouseClick(e: MouseEvent) {
        this.colorPickerImageService.selectedPixel = this.getPixelFromMouseEvent(e);
    }

    public canvasOnMouseOver(e: MouseEvent) {
        this.isMouseOverImage = true;
    }

    public canvasOnMouseOut(e: MouseEvent) {
        this.isMouseOverImage = false;
    }

    private static getCanvasRelativePosition(canvasElement: HTMLCanvasElement, mouseEvent: MouseEvent): Point {
        const canvasElementBoundingClientRect = canvasElement.getBoundingClientRect();
        const canvasSize = { width: canvasElement.width, height: canvasElement.height };
        const canvasElementSize = { width: canvasElementBoundingClientRect.width, height: canvasElementBoundingClientRect.height };
        const canvasElementRelativeCursorPosition = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
        return new Point(
            canvasSize.width / canvasElementSize.width * canvasElementRelativeCursorPosition.x,
            canvasSize.height / canvasElementSize.height * canvasElementRelativeCursorPosition.y);
    }

    private getPixelFromMouseEvent(e: MouseEvent): Pixel {
        return {
            screenPosition: {x: e.x, y: e.y},
            position: ImageColorPickerComponent.getCanvasRelativePosition(this.imageCanvas, e),
            hex: "",
            rgb: ""
        };
    }
}
