import ModalRef from "../models/ModalRef";

const modals = {
    uploadImageModal: new ModalRef("#upload-image-modal", {
        backdrop: true
    }),
    appSettingsModal: new ModalRef("#settings-modal", {
        backdrop: true
    })
};
export default modals;
