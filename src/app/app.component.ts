import { Component } from '@angular/core';
import { AmountEditorComponent } from './amount-editor.component';
import { formatCurrency, formatDate } from '@angular/common';

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
    columnTypes: {
      'textolumn': {},
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
  columnDefs = [
      {
        headerName: 'Make',
        field: 'make',
        type: 'selectColumn',
        editable: true,
        cellEditorParams: {
            values: [
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
        cellEditorParams: {
            values: [
              "Corolla",
              "Civic",
              "Sentra"
            ]
        }
      },
      {
        headerName: 'Price',
        field: 'price',
        type: "amountColumn",
        editable: true
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
        { make: 'Toyota', model: 'Corolla', price: 35000, saleEndDate: new Date(), usedIndicator: 'Y' },
        { make: 'Honda', model: 'Civic', price: 32000, saleEndDate: new Date(), usedIndicator: 'N' },
        { make: 'Nissan', model: 'Sentra', price: 72000, saleEndDate: new Date(), usedIndicator: 'Y' }
    ];
}
