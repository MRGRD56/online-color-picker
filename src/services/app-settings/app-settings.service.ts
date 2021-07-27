import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService {
    public pixelInfoPopup = {
        scaledImageSize: 11,
        elementSize: {
            width: 150,
            get height(): number {
                return this.width + 30;
            }
        }
    };

    public colorPicker = {
        isReversedDragScrolling: false,
        dragScrollingSpeed: 1
    }
}
