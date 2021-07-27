import {TestBed} from '@angular/core/testing';
import {ColorPickerImageService} from './color-picker-image.service';

describe('ColorPickerImageService', () => {
    let service: ColorPickerImageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ColorPickerImageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
