import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CadastroComponent } from "../screens/cadastro/cadastro.component";
import { FormCadastroComponent } from "../screens/cadastro/form-cadastro/form-cadastro.component";
import { ListaComponent } from "../screens/cadastro/lista-cadastro/lista.component";
import { HomeComponent } from "../screens/home/home.component";
import { FormTriagemComponent } from "../screens/triagem/form-triagem/form-triagem.component";
import { ListaTriagemComponent } from "../screens/triagem/lista-triagem/lista-triagem.component";
import { TriagemComponent } from "../screens/triagem/triagem.component";
import { MyRouteTesteRoutes } from "./components-routing.module";
import { DeleteComponent } from "./delete/delete.component";
import { ErrorDialogComponent } from "./errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "./errors/sem-permissao/sem-permissao.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ImageComponent } from "./upload-image/image.component";
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    TriagemComponent,
    FormCadastroComponent,
    ToolbarComponent,
    ListaComponent,
    ErrorDialogComponent,
    HomeComponent,
    DeleteComponent,
    CadastroComponent,
    ListaTriagemComponent,
    SemPermissaoComponent,
    FormTriagemComponent,
    ImageComponent,
    TestComponent,
  ],
  imports: [
    MatTabsModule,
    MatExpansionModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MyRouteTesteRoutes,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
  ],
  exports: [FormCadastroComponent],
})
export class ComponentsModule {}
