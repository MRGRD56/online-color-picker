import {Injectable} from '@angular/core';
import Pixel from "../../models/Pixel";
import {Observable, Observer, Subscriber} from "rxjs";
import Modals from "../Modals";

@Injectable({
    providedIn: 'root'
})
export class ColorPickerImageService {
    private _currentImage?: string;

    public get currentImage() {
        return this._currentImage;
    }
    public set currentImage(value) {
        this._currentImage = value;
        this.currentImageChangedSubscriber?.next(this._currentImage);
        if (this._currentImage) {
            Modals.uploadImageModal.modal!.hide();
            document.querySelectorAll("div.modal-backdrop").forEach(element => {
                element.removeAttribute("show");
                element.remove();
            });
        }
    }

    private _currentImageElement?: HTMLImageElement;
    get currentImageElement(): HTMLImageElement | undefined {
        return this._currentImageElement;
    }
    set currentImageElement(value: HTMLImageElement | undefined) {
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

    public loadFromDataTransfer(dataTransfer: DataTransfer, beforeLoading: (() => void) | undefined = undefined) {
        if (!(dataTransfer?.files?.length)) {
            return;
        }
        this.isImageLoading = true;
        beforeLoading?.();

        const imageFile = dataTransfer.files[0];
        this.loadFromFile(imageFile);
    }

    public loadFromFile(file: File) {
        this.currentImage = URL.createObjectURL(file);
    }

    private _hoveredPixel: Pixel | null | undefined;
    get hoveredPixel(): Pixel | null | undefined {
        return this._hoveredPixel;
    }

    set hoveredPixel(value: Pixel | null | undefined) {
        this._hoveredPixel = value;
        this.hoveredPixelChangedSubscriber?.next(value);
    }

    private _selectedPixel: Pixel | null | undefined;
    get selectedPixel(): Pixel | null | undefined {
        return this._selectedPixel;
    }

    set selectedPixel(value: Pixel | null | undefined) {
        this._selectedPixel = value;
        this.selectedPixelChangedSubscriber?.next(value);
    }
}
