import { Component } from '@angular/core';
import { AmountEditorComponent } from './amount-editor.component';
import { formatCurrency } from '@angular/common';

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
      'amountColumn': {
        cellEditorFramework: AmountEditorComponent,
        valueFormatter: (params: ValueFormatterParams) => {
          return formatCurrency(params.value, 'en', '', '1.2-2');
        }
      }
    }
  }
    columnDefs = [
        {
          headerName: 'Make',
          field: 'make'
        },
        {
          headerName: 'Model',
          field: 'model',
          width: 70,
          editable: true,
          cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                    values: [
                        "Celica",
                        "Mondeo",
                        "Boxter",
                        "Corolla"
                    ]
                }
        },
        {
          headerName: 'Price',
          field: 'price',
          type: "amountColumn",
          editable: true
        }
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
}
