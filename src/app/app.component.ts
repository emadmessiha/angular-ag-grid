import { Component } from '@angular/core';
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

  gridOptions = {
    stopEditingWhenGridLosesFocus: true,
    rowSelection: 'single',
    context: {
      invalidCells: new Map()
    },
    defaultColDef: {
      cellClassRules: {
        'error-field': (params) => {
          const cellKey = params.rowIndex + '' + params.colDef.field;
          // Debug statment
          if (cellKey === '0price') { 
            console.log(params.context.invalidCells.get(cellKey));
          }
          if (params.context) {
            if (params.context.invalidCells !== undefined) {
              return (params.context.invalidCells.get(cellKey) === undefined ? '' : 'error-field');
            }
          }
          return '';
        }
      },
      editable: (params) => {
        return !params.node.isRowPinned();
      }
    },
    columnTypes: {
      'textColumn': {},
      'selectColumn': {
        cellEditor: 'agRichSelectCellEditor'
      },
      'amountColumn': {
        cellEditorFramework: AmountEditorComponent,
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
  carModels = [
      { key: 0, name: ">> Select" },
      { key: 1, name: "Corolla" },
      { key: 2, name: "Civic" },
      { key: 3, name: "Sentra" }
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
            values: [
              ">> Select",
              "Toyota",
              "Honda",
              "Nissan"
            ]
        }
      },
      {
        headerName: 'Model',
        field: 'model',
        type: 'selectColumn',
        editable: true,
        valueFormatter: (params) => {
          return this.carModels.filter((carModel) => {
            return carModel.key === params.value;
          })[0].name;
        },
        cellEditorParams: (params) => {
            const returnParams = {
              values: this.carModels.map((carModel) => {
                return carModel.key;
              })
            };

            return returnParams;
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
        { make: 'Toyota', model: 1, price: 35000, saleEndDate: new Date(), usedIndicator: 'Y' },
        { make: 'Honda', model: 2, price: 32000, saleEndDate: new Date(), usedIndicator: 'N' },
        { make: 'Nissan', model: 3, price: 72000, saleEndDate: new Date(), usedIndicator: 'Y' }
    ];

    pinnedRowData = [
      { make: 'Total', model: 0, price: 0, saleEndDate: null, usedIndicator: '' }
    ];

    saveClick = function() {
      console.log(this.rowData);
    }
}
