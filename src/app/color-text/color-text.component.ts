import {Component, Input} from "@angular/core";

@Component({
    selector: "app-color-text",
    templateUrl: "./color-text.component.html",
    styleUrls: ["./color-text.component.scss"]
})
export class ColorTextComponent {
    @Input() label: string = "";
    @Input() color: string = "";
    @Input() elementClass: string = "";
    @Input() elementStyle: string = "";

    onCopyButtonClicked() {
        navigator.clipboard.writeText(this.color).catch(console.error);
    }
}
