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
import { DataFormatPipe } from "../pipe/data-format.pipe";
import { UpperToCamelCasePipe } from "../pipe/upper-to-camel-case.pipe";
import { CadastroComponent } from "../screens/cadastro/cadastro.component";
import { FormCadastroComponent } from "../screens/cadastro/form-cadastro/form-cadastro.component";
import { ListaComponent } from "../screens/cadastro/lista-cadastro/lista.component";
import { HomeComponent } from "../screens/home/home.component";
import { FormTriagemComponent } from "../screens/triagem/form-triagem/form-triagem.component";
import { ListaTriagemComponent } from "../screens/triagem/lista-triagem/lista-triagem.component";
import { TriagemComponent } from "../screens/triagem/triagem.component";
import { MyRouteTesteRoutes } from "./components-routing.module";
import { DeleteComponent } from "./dialog/delete/delete.component";
import { DetalheProdutoComponent } from "./dialog/detalhe-produto/detalhe-produto.component";
import { EmailComponent } from "./dialog/email/email.component";
import { ErrorDialogComponent } from "./dialog/errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "./dialog/errors/sem-permissao/sem-permissao.component";
import { ImageComponent } from "./dialog/upload-image/image.component";
import { TestComponent } from "./test/test.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
  declarations: [
    DataFormatPipe,
    UpperToCamelCasePipe,
    DetalheProdutoComponent,
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
    DetalheProdutoComponent,
    EmailComponent,
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
