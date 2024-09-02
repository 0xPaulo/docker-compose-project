import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DatePipe } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { CustomPaginator } from "./util/CustomPaginatorConfiguration";
import { JwtInterceptor } from "./util/JwtInterceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
