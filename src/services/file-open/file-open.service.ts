import {Injectable} from "@angular/core";
import {fromEvent} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class FileOpenService {
    public openFile(accept: string | undefined = undefined, multiple: boolean = false): Promise<FileList> {
        const inputElement = document.createElement("input");
        inputElement.style.display = "none";
        inputElement.type = "file";
        if (multiple) {
            inputElement.setAttribute("multiple", "");
        }
        if (accept != undefined) {
            inputElement.setAttribute("accept", accept);
        }
        const filesOpened$ = fromEvent<Event>(inputElement, "change");

        return new Promise<FileList>((resolve, reject) => {
            filesOpened$
                .subscribe(_ => {
                    resolve(inputElement.files!);
                    inputElement.remove();
                }, error => reject(error));
            inputElement.click();
        });
    }
}
