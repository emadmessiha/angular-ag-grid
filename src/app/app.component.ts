import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AmountEditorComponent } from './amount-editor.component';
import { formatCurrency, formatDate } from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  title = 'app';
  @ViewChild('tooltipInput', {read: ViewContainerRef}) public tooltipInput;

  onKeyUp = (event, tooltip) => {
    const nativeElement = this.tooltipInput.element.nativeElement;
    const textValue: string = this.tooltipInput.element.nativeElement.value;
    if (textValue === 'test') {
      tooltip.open();
    } else {
      tooltip.close();
    }
  }

  gridOptions = {
    stopEditingWhenGridLosesFocus: true,
    rowSelection: 'single',
    context: {
      invalidCells: new Map()
    },
    defaultColDef: {
      cellClassRules: {
        'error-cell': (params) => {
          const cellKey = params.rowIndex + '' + params.colDef.field;
          if (!params.node.isRowPinned()) {
            if (params.context) {
              if (params.context.invalidCells !== undefined) {
                return (params.context.invalidCells.get(cellKey) !== undefined);
              }
            }
          }
          return false;
        }
      },
      editable: (params) => {
        return !params.node.isRowPinned();
      }
    },
    columnTypes: {
      'textColumn': {},
      'selectColumn': {
        cellEditor: 'agRichSelectCellEditor',
        valueFormatter: (params) => {
          const currentColDef = params.colDef;
          let editorParams = null;
          if (currentColDef !== undefined || currentColDef !== null) {
            editorParams = currentColDef.cellEditorParams;
          }
          const dropDownItems = (editorParams ? (editorParams.values ? editorParams.values : []) : []);
          const item = dropDownItems.filter((dropDownItem) => {
            return dropDownItem.key === params.value;
          })[0];
          if (item) {
            return item.name;
          }
          return '';
        },
        valueParser: (params) => {
          const currentColDef = params.colDef;
          let editorParams = null;
          if (currentColDef !== undefined || currentColDef !== null) {
            editorParams = currentColDef.cellEditorParams;
          }
          const dropDownItems = (editorParams ? (editorParams.values ? editorParams.values : []) : []);
          const returnParams = {
            values: dropDownItems.map((dropDownItem) => {
              return (dropDownItem.key ? dropDownItem.key : dropDownItem);
            })
          };
          return returnParams;
        }
      },
      'amountColumn': {
        cellEditorFramework: AmountEditorComponent,
        cellStyle: {
          textAlign: 'right'
        },
        headerClass: 'amount-header',
        valueFormatter: (params: any) => {
          return formatCurrency(params.value, 'en', '', '1.2-2');
        }
      },
      'checkboxColumn': {
        cellRenderer: (params: any) => {
          return (params.value === 'Y' ? '<b style="color: green">Yes</b>' : '<b style="color: red">No</b>');
        }
      },
      'dateColumn': {
        valueFormatter: (params: any) => {
          return formatDate(params.value, 'yyyy-MM-dd', 'en');
        }
      }
    }
  }

  columnDefs = [
      {
        headerName: 'Make',
        field: 'make',
        type: 'selectColumn',
        editable: (params) => {
          return !params.node.isRowPinned();
        },
        cellEditorParams: {
            values: [
                { key: 0, name: ">> Select" },
                { key: 1, name: "Toyota" },
                { key: 2, name: "Honda" },
                { key: 3, name: "Nissan" }
            ]
        }
      },
      {
        headerName: 'Model',
        field: 'model',
        type: 'selectColumn',
        editable: true,
        cellEditorParams: {
          values: [
              { key: 0, name: ">> Select" },
              { key: 1, name: "Corolla" },
              { key: 2, name: "Civic" },
              { key: 3, name: "Sentra" }
          ]
        }
      },
      {
        headerName: 'Price',
        field: 'price',
        type: "amountColumn",
        editable: true,
        cellEditorParams: {
          validators: [
            Validators.min(1000),
            Validators.max(100000)
          ]
        }
      },
      {
        headerName: 'Sale end date',
        field: 'saleEndDate',
        type: 'dateColumn'
      },
      {
        headerName: 'Used?',
        field: 'usedIndicator',
        type: 'checkboxColumn'
      }
    ];

    rowData = [
        { make: 1, model: 1, price: 35000, saleEndDate: new Date(), usedIndicator: 'Y' },
        { make: 2, model: 2, price: 32000, saleEndDate: new Date(), usedIndicator: 'N' },
        { make: 3, model: 3, price: 72000, saleEndDate: new Date(), usedIndicator: 'Y' }
    ];

    pinnedRowData = [
      { make: 'Total', model: 0, price: 0, saleEndDate: null, usedIndicator: '' }
    ];

    saveClick = function() {
      console.log(this.rowData);
    }
}
