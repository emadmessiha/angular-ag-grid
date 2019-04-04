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
          if (params.node.isRowPinned()) {
            return params.value;
          }
          const currentColDef = params.colDef;
          let editorParams = null;
          if (currentColDef !== undefined && currentColDef !== null) {
            editorParams = currentColDef.cellEditorParams;
          }
          const dropDownItems = (editorParams ? (editorParams.values ? editorParams.values : []) : []);
          const item = dropDownItems.filter((dropDownItem) => {
            return dropDownItem.value === params.value;
          })[0];
          if (item) {
            return item.name;
          }
          return '';
        },
        // valueParser: (params) => {
        //   if (params.node.isRowPinned()) {
        //     return params.newValue;
        //   }
        //   const currentColDef = params.colDef;
        //   let editorParams = null;
        //   if (currentColDef !== undefined && currentColDef !== null) {
        //     editorParams = currentColDef.cellEditorParams;
        //   }
        //   console.log(params.newValue);
        //   const dropDownItems = (editorParams ? (editorParams.dropDownData ? editorParams.dropDownData : []) : []);
        //   const item = dropDownItems.filter((dropDownItem) => {
        //       return dropDownItem.name === params.newValue;
        //     })[0];
        //   return (item ? item.key : '' );
        // }
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

  getDropDownValues = (dropDownItems) => {
    return dropDownItems.map((dropDownItem) => {
      return dropDownItem.name;
    })
  }

  dropDownDataMake = [
    { value: 0, name: ">> Select" },
    { value: 1, name: "Toyota" },
    { value: 2, name: "Honda" },
    { value: 3, name: "Nissan" }
  ];
  dropDownDataModel = [
    { value: 0, name: ">> Select" },
    { value: 1, name: "Corolla" },
    { value: 2, name: "Civic" },
    { value: 3, name: "Sentra" }
  ];

  columnDefs = [
      {
        headerName: 'Make',
        field: 'make',
        type: 'selectColumn',
        editable: (params) => {
          return !params.node.isRowPinned();
        },
        cellEditorParams: {
          values: this.dropDownDataMake
        }
      },
      {
        headerName: 'Model',
        field: 'model',
        type: 'selectColumn',
        editable: true,
        cellEditorParams: {
          values: this.dropDownDataModel
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
