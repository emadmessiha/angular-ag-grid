import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { ICellEditorAngularComp } from "ag-grid-angular";
import { formatNumber } from '@angular/common';
// https://ng-bootstrap.github.io/#/components/tooltip/examples
// https://ng-bootstrap.github.io/#/components/popover/examples
@Component({
    selector: 'amount-editor',
    template: `
    <input placement="bottom"
        ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." popoverTitle="Popover on bottom" [autoClose]="false" triggers="manual" #p="ngbPopover"
    #input type="number" [class]="cssClass" (keyup)="onKeyUp($event, p)" [(ngModel)]="value" style="width: 100%; border: none; height: 100%; text-align: right;" autocomplete="off">`
})
export class AmountEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private cancelBeforeStart: boolean = false;
    public cssClass: string;
    public editorControl: FormControl;
    public cellKey: string;
    public tooltipMessage: string = 'world';

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

    isValid(inputValue: string): boolean {
      const parsedValue: number = parseFloat(inputValue);
      if (isNaN(parsedValue)) {
        return false;
      } else {
        this.editorControl.setValue(inputValue);
        this.editorControl.updateValueAndValidity();
        return (this.editorControl.valid);
      }
      return true;
    }

    onKeyUp(event, p): void {
      p.open();
      const nativeElement = this.input.element.nativeElement;
      const numberValue: string = this.input.element.nativeElement.value;
      
      if (this.isValid(numberValue)) {
        this.params.context.invalidCells.delete(this.cellKey);
        this.cssClass = '';
      } else {
        this.params.context.invalidCells.set(this.cellKey, true);
        this.cssClass = 'error-field';
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