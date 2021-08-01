import {Component, Input} from "@angular/core";
import {AppSettingsService} from "../../services/app-settings/app-settings.service";

@Component({
    selector: "app-color-view",
    templateUrl: "./color-view.component.html",
    styleUrls: ["./color-view.component.scss"]
})
export class ColorViewComponent {
    @Input() public color: string = "#ffffff";
    @Input() public width: number = 60;
    @Input() public height: number = 60;
    @Input() public elementClass: string = "";
    @Input() public elementStyle: string = "";

    constructor(public readonly appSettings: AppSettingsService) {
    }
}
