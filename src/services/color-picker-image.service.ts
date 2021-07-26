import {Injectable} from '@angular/core';
import Pixel from "../models/Pixel";
import {Observable, Observer, Subscriber} from "rxjs";

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
        this.currentImageChangedSubscriber?.next(value);
    }

    private _currentImageElement?: HTMLImageElement;
    get currentImageElement(): HTMLImageElement | undefined {
        return this._currentImageElement;
    }
    set currentImageElement(value: HTMLImageElement | undefined) {
        this._currentImageElement = value;
    }

    public isImageLoaded() {
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

        const imageFile = dataTransfer.files[0];
        this.currentImage = URL.createObjectURL(imageFile);
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
