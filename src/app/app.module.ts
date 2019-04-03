import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AgGridModule } from 'ag-grid-angular';
import { AmountEditorComponent } from './amount-editor.component';
import 'ag-grid-enterprise';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export class NgbdTooltipTriggersModule {}
@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([
      AmountEditorComponent
    ])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    AmountEditorComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
