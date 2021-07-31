import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: "[appNgRepeat]"
})
export class NgRepeatDirective {

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) {

    }

    @Input() set appNgRepeat(repeatTimes: number) {
        for (let i = 0; i < repeatTimes; i++) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
