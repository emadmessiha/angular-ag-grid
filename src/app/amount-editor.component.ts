import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";

import {ICellEditorAngularComp} from "ag-grid-angular";

@Component({
    selector: 'amount-editor',
    template: `<input #input [class]="cssClass" (keydown)="onKeyDown($event)" [(ngModel)]="value" style="width: 100%; border: none; text-align: right;">`
})
export class AmountEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private cancelBeforeStart: boolean = false;
    public cssClass: string;

    @ViewChild('input', {read: ViewContainerRef}) public input;

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;

        // only start edit if key pressed is a number, not a letter
        // this.cancelBeforeStart = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
    }

    getValue(): any {
        return this.value;
    }

    // isCancelBeforeStart(): boolean {
    //     return this.cancelBeforeStart;
    // }

    // will reject the number if it greater than 1,000,000
    // not very practical, but demonstrates the method.
    // isCancelAfterEnd(): boolean {
    //     return this.value > 1000000;
    // };

    onKeyDown(event): void {
        if (!this.isKeyPressedNumeric(event)) {
          this.cssClass = this.value > 100000 ? 'error-field' : '';
        }
    }

    // dont use afterGuiAttached for post gui events - hook intthiso ngAfterViewInit instead for this
    ngAfterViewInit() {
        setTimeout(() => {
            this.input.element.nativeElement.focus();
            this.input.element.nativeElement.select();
        })
    }

    private getCharCodeFromEvent(event): any {
        event = event || window.event;
        return (typeof event.which == "undefined") ? event.keyCode : event.which;
    }

    private isCharNumeric(charStr): boolean {
        return !!/\d/.test(charStr);
    }

    private isKeyPressedNumeric(event): boolean {
        const charCode = this.getCharCodeFromEvent(event);
        const charStr = event.key ? event.key : String.fromCharCode(charCode);
        return this.isCharNumeric(charStr);
    }
}