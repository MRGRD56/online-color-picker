import {Modal} from "bootstrap";

export default class ModalRef {
    private _modal?: Modal;
    public get modal(): Modal | null {
        if (!this.modalElementQuerySelector) return null;
        if (!this._modal) {
            this._modal = new Modal(this.modalElementQuerySelector, this.modalOptions);
        }
        return this._modal;
    }

    constructor(private readonly modalElementQuerySelector: string | Element,
                private readonly modalOptions: Partial<Modal.Options> | undefined = undefined) {
    }
}
