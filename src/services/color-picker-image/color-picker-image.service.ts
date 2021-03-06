import {Injectable} from "@angular/core";
import Pixel from "../../models/Pixel";
import {Observable, Observer, Subscriber} from "rxjs";
import modals from "../Modals";
import {AppSettingsService} from "../app-settings/app-settings.service";
import {ColorFormat} from "../../models/ColorFormat";
import Size from "../../models/Size";
import {ColorMode} from "../../models/ColorMode";

@Injectable({
    providedIn: "root"
})
export class ColorPickerImageService {
    constructor(private readonly appSettings: AppSettingsService) {
    }

    private get colorMode(): ColorMode {
        return this.appSettings.colorPicker.colorMode;
    }

    private _currentImage?: string;

    public get currentImage() {
        return this._currentImage;
    }
    public set currentImage(value) {
        this._currentImage = value;
        this.currentImageChangedSubscriber?.next(this._currentImage);
        if (this._currentImage) {
            modals.uploadImageModal.modal!.hide();
        }
    }

    private _currentImageSize?: Size;
    public get currentImageSize(): Size | undefined {
        return this._currentImageSize;
    }

    private set currentImageSize(value: Size | undefined) {
        this._currentImageSize = value;
    }

    private _currentImageElement?: HTMLImageElement;
    public get currentImageElement(): HTMLImageElement | undefined {
        return this._currentImageElement;
    }
    public set currentImageElement(value: HTMLImageElement | undefined) {
        this._currentImageElement = value;
    }

    private _isImageLoading = false;
    get isImageLoading(): boolean {
        return this._isImageLoading;
    }
    private set isImageLoading(value: boolean) {
        this._isImageLoading = value;
    }

    public get isImageLoaded() {
        return this.currentImage != null;
    }

    public currentImageChanged$: Observable<string> = new Observable<string>(subscriber => {
        this.currentImageChangedSubscriber = subscriber;
    });
    private currentImageChangedSubscriber?: Subscriber<string>;

    public hoveredPixelChanged$: Observable<Pixel | null | undefined> = new Observable<Pixel | null | undefined>(subscriber => {
        this.hoveredPixelChangedSubscriber = subscriber;
    });
    private hoveredPixelChangedSubscriber?: Subscriber<Pixel | null | undefined>;

    public selectedPixelChanged$: Observable<Pixel | null | undefined> = new Observable<Pixel | null | undefined>(subscriber => {
        this.hoveredPixelChangedSubscriber = subscriber;
    });
    private selectedPixelChangedSubscriber?: Subscriber<Pixel | null | undefined>;

    public loadFromDataTransfer(dataTransfer: DataTransfer) {
        if (!(dataTransfer?.files?.length)) {
            return;
        }
        this.isImageLoading = true;

        const imageFile = dataTransfer.files[0];
        this.loadFromFile(imageFile);
    }

    public loadFromFile(file: File) {
        if (!file.type.startsWith("image/")) return;
        this.currentImage = URL.createObjectURL(file);
    }

    private _hoveredPixel: Pixel | null | undefined;
    public get hoveredPixel(): Pixel | null | undefined {
        return this._hoveredPixel;
    }

    public set hoveredPixel(value: Pixel | null | undefined) {
        this._hoveredPixel = value;
        this.hoveredPixelChangedSubscriber?.next(value);
    }

    private _selectedPixel: Pixel | null | undefined;
    public get selectedPixel(): Pixel | null | undefined {
        return this._selectedPixel;
    }

    public set selectedPixel(value: Pixel | null | undefined) {
        this.setSelectedPixel(value, true);
    }

    public setSelectedPixel(value: Pixel | null | undefined, addToHistory: boolean) {
        this._selectedPixel = value;
        this.selectedPixelChangedSubscriber?.next(value);
        if (this._selectedPixel && this.appSettings.colorPicker.autoCopyColor !== null) {
            const getTextToCopy = () => {
                switch (this.appSettings.colorPicker.autoCopyColor) {
                case ColorFormat.Hex:
                    return this._selectedPixel?.color.getHex(this.colorMode);
                case ColorFormat.Rgb:
                    return this._selectedPixel?.color.getRgb(this.colorMode);
                default:
                    return null;
                }
            };
            const textToCopy = getTextToCopy();
            if (textToCopy == null) return;

            navigator.clipboard.writeText(textToCopy).catch(console.error);
        }
        if (addToHistory
            && this._selectedPixel != null
            && (this.selectedPixelsHistory.length === 0
                || !this.selectedPixelsHistory[0].color.equals(this._selectedPixel.color))) {
            this.selectedPixelsHistory.unshift(this._selectedPixel);
        }
    }

    public selectedPixelsHistory: Pixel[] = [];

    public renderImage(canvas: HTMLCanvasElement): void {
        const canvasContext = canvas.getContext("2d")!;

        this.currentImageElement = new Image();
        this.currentImageElement.addEventListener("load", () => {
            canvas.width = this.currentImageElement!.width;
            canvas.height = this.currentImageElement!.height;
            this.currentImageSize = {
                width: canvas.width,
                height: canvas.height
            };
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.drawImage(this.currentImageElement!, 0, 0);
        });
        this.currentImageElement.src = this.currentImage!;
    }
}
