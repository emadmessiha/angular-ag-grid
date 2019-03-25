import { Component } from '@angular/core';
import { AmountEditorComponent } from './amount-editor.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  title = 'app';

    columnDefs = [
        {
          headerName: 'Make',
          field: 'make',
          width: 70
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
          type: "numericColumn",
          cellEditorFramework: AmountEditorComponent,
          editable: true,
          width: 90
        }
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
}
