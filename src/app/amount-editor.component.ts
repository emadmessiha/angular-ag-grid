import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { ICellEditorAngularComp } from "ag-grid-angular";
import { formatNumber } from '@angular/common';
// https://ng-bootstrap.github.io/#/components/tooltip/examples
@Component({
    selector: 'amount-editor',
    template: `<input #input type="number" [class]="cssClass" (keyup)="onKeyUp($event)" [(ngModel)]="value" style="width: 100%; border: none; height: 100%; text-align: right;" autocomplete="off">`
})
export class AmountEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private cancelBeforeStart: boolean = false;
    public cssClass: string;
    public editorControl: FormControl;
    public cellKey: string;
    public tooltipOptions: any = {
      arrow: true,
      allowHTML: true,
      theme: 'light',
      trigger: 'focus',
      content: 'default content'
    };

    @ViewChild('input', {read: ViewContainerRef}) public input;

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;
        this.editorControl = new FormControl();
        this.editorControl.setValidators(this.params.validators);
        this.editorControl.setValue(this.getValue());
        this.cellKey = this.params.rowIndex + this.params.column.colId;
    }

    getValue(): any {
        return (Math.round(this.value * 100) / 100).toFixed(2);
    }

    onKeyUp(event): void {
      const nativeElement = this.input.element.nativeElement;
      const numberValue: string = this.input.element.nativeElement.value;
      const parsedValue: number = parseFloat(numberValue);
      if (isNaN(parsedValue)) {
        this.params.context.invalidCells.set(this.cellKey, true);
        this.cssClass = 'error-field';
      } else {
        this.editorControl.setValue(numberValue);
        this.editorControl.updateValueAndValidity();
        if (this.editorControl.invalid) {
          this.params.context.invalidCells.set(this.cellKey, true);
          this.cssClass = 'error-field';
        } else {
          this.params.context.invalidCells.delete(this.cellKey);
          this.cssClass = '';
        }
      }
    }

    // dont use afterGuiAttached for post gui events - hook intthiso ngAfterViewInit instead for this
    ngAfterViewInit() {
        setTimeout(() => {
            this.input.element.nativeElement.focus();
            this.input.element.nativeElement.select();
        })
    }
}