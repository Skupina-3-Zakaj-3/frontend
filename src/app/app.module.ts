import { RvParkComponent } from './rso/components/rv-park/rv-park.component';
import { OgrodjeComponent } from './rso/components/ogrodje/ogrodje.component';
import { PrijavaComponent } from './rso/components/prijava/prijava.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RsoService } from './rso/services/rso.service';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        PrijavaComponent,
        OgrodjeComponent,
        RvParkComponent
    ],
    providers: [RsoService],
    bootstrap: [OgrodjeComponent]
})
export class AppModule {
}

