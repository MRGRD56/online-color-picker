import {Carousel, Modal} from "bootstrap";
import {fromEvent, Observable} from "rxjs";

export default class ModalRef {
    private _modal?: Modal;
    public get modal(): Modal | null {
        if (!this.modalElementQuerySelector) return null;
        if (!this._modal) {
            this._modal = new Modal(this.modalElementQuerySelector, this.modalOptions);
        }
        return this._modal;
    }

    public get modalElement(): Element | null {
        return document.querySelector(<string>this.modalElementQuerySelector);
    }

    public show$?: Observable<Carousel.Event>;
    public shown$?: Observable<Carousel.Event>;
    public hide$?: Observable<Carousel.Event>;
    public hidden$?: Observable<Carousel.Event>;
    public hidePrevented$?: Observable<Carousel.Event>;

    constructor(private readonly modalElementQuerySelector: string,
                private readonly modalOptions: Partial<Modal.Options> | undefined = undefined) {

    }

    public initializeObservables() {
        if (this.modalElement == null) {
            return;
        }

        this.show$ = fromEvent(this.modalElement, "show.bs.modal");
        this.shown$ = fromEvent(this.modalElement, "shown.bs.modal");
        this.hide$ = fromEvent(this.modalElement, "hide.bs.modal");
        this.hidden$ = fromEvent(this.modalElement, "hidden.bs.modal");
        this.hidePrevented$ = fromEvent(this.modalElement, "hidePrevented.bs.modal");
    }
}
