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
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CapitalizePipe } from "../pipe/capitalize.pipe";
import { DataFormatPipe } from "../pipe/data-format.pipe";
import { UpperToCamelCasePipe } from "../pipe/upper-to-camel-case.pipe";
import { CadastroComponent } from "../screens/cadastro/cadastro.component";
import { FormCadastroComponent } from "../screens/cadastro/form-cadastro/form-cadastro.component";
import { FormCriarCadastroComponent } from "../screens/cadastro/form-criar-cadastro/form-criar-cadastro.component";
import { ListaComponent } from "../screens/cadastro/lista-cadastro/lista.component";
import { ConcluidoComponent } from "../screens/concluido/concluido.component";
import { ListaConcluidoComponent } from "../screens/concluido/lista-concluido/lista-concluido.component";
import { HomeComponent } from "../screens/home/home.component";
import { LoginComponent } from "../screens/login/login.component";
import { FormManuTecComponent } from "../screens/manutencao/form-manu-tec/form-manu-tec.component";
import { ListaManuComponent } from "../screens/manutencao/lista-manu/lista-manu.component";
import { ManutencaoComponent } from "../screens/manutencao/manutencao.component";
import { TecnicoTabelaComponent } from "../screens/tecnico-tela/tecnico-tabela/tecnico-tabela.component";
import { TecnicoComponent } from "../screens/tecnico-tela/tecnico.component";
import { FormTriagemComponent } from "../screens/triagem/form-triagem/form-triagem.component";
import { ListaTriagemComponent } from "../screens/triagem/lista-triagem/lista-triagem.component";
import { TriagemComponent } from "../screens/triagem/triagem.component";
import { BuscaClienteComponent } from "./busca-cliente/busca-cliente.component";
import { MyRouteTesteRoutes } from "./components-routing.module";
import { DeleteComponent } from "./dialog/delete/delete.component";
import { DetalheProdutoComponent } from "./dialog/detalhe-produto/detalhe-produto.component";
import { EmailContatoComponent } from "./dialog/email/email-contato/email-contato.component";
import { EmailComponent } from "./dialog/email/email/email.component";
import { EntregueClienteComponent } from "./dialog/entregue-cliente/entregue-cliente.component";
import { ErrorDialogComponent } from "./dialog/errors/error-dialog/error-dialog.component";
import { SemPermissaoComponent } from "./dialog/errors/sem-permissao/sem-permissao.component";
import { CancelarComponent } from "./dialog/finalizar-pedido/cancelar/cancelar.component";
import { FinalizarPedidoComponent } from "./dialog/finalizar-pedido/finalizar-pedido.component";
import { PossuiCadastroComponent } from "./dialog/possui-cadastro/possui-cadastro.component";
import { TabelaTecnicoComponent } from "./dialog/tabela-tecnico/tabela-tecnico.component";
import { ImageComponent } from "./dialog/upload-image/image.component";
import { TestComponent } from "./test/test.component";
import { DialogCriarClienteComponent } from "./toolbar/dialog-criar-cliente/dialog-criar-cliente.component";
import { DialogCriarTecnicoComponent } from "./toolbar/dialog-criar-tecnico/dialog-criar-tecnico.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
  declarations: [
    LoginComponent,
    CancelarComponent,
    ConcluidoComponent,
    ListaConcluidoComponent,
    TecnicoComponent,
    TecnicoTabelaComponent,
    CapitalizePipe,
    FormCriarCadastroComponent,
    FormManuTecComponent,
    ListaManuComponent,
    ManutencaoComponent,
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
    BuscaClienteComponent,
    PossuiCadastroComponent,
    DialogCriarClienteComponent,
    FinalizarPedidoComponent,
    EmailContatoComponent,
    EntregueClienteComponent,
    DialogCriarTecnicoComponent,
    TabelaTecnicoComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatMenuModule,
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
