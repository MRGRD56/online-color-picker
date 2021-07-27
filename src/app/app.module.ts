import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ImageColorPickerComponent } from './image-color-picker/image-color-picker.component';
import { PixelInfoPopupComponent } from './pixel-info-popup/pixel-info-popup.component';
import { UploadImageComponent } from './load-image/upload-image.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ImageColorPickerComponent,
        PixelInfoPopupComponent,
        UploadImageComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
